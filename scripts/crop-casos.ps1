# Normaliza os pares antes/depois para o mesmo enquadramento.
# Cada par recebe o MESMO fator de zoom relativo a boca e a MESMA
# posicao vertical da linha dos labios, para que o comparador alinhe.
Add-Type -AssemblyName System.Drawing

$OutW = 1600
$OutH = 900   # 16:9

function Export-Caso {
  param(
    [string]$Src, [string]$Dst,
    [double]$Mx, [double]$My,   # centro da boca, em px da imagem original
    [double]$Mw,                # largura da boca, em px
    [double]$K,                 # largura do quadro = K x largura da boca
    [double]$Ty                 # altura alvo da boca dentro do quadro (0-1)
  )

  $img = [System.Drawing.Image]::FromFile((Resolve-Path $Src).Path)
  try {
    $sw = [double]$img.Width; $sh = [double]$img.Height

    $cw = $Mw * $K
    $ch = $cw * $OutH / $OutW

    # nao pode passar dos limites da origem: reduz mantendo a proporcao
    if ($cw -gt $sw) { $cw = $sw; $ch = $cw * $OutH / $OutW }
    if ($ch -gt $sh) { $ch = $sh; $cw = $ch * $OutW / $OutH }

    $left = $Mx - $cw / 2.0
    $top  = $My - $Ty * $ch

    if ($left -lt 0) { $left = 0 }
    if ($top  -lt 0) { $top  = 0 }
    if ($left + $cw -gt $sw) { $left = $sw - $cw }
    if ($top  + $ch -gt $sh) { $top  = $sh - $ch }

    $bmp = New-Object System.Drawing.Bitmap($OutW, $OutH)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode  = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode    = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    $destRect = New-Object System.Drawing.Rectangle(0, 0, $OutW, $OutH)
    $g.DrawImage($img, $destRect, [single]$left, [single]$top, [single]$cw, [single]$ch,
                 [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
             Where-Object { $_.MimeType -eq 'image/jpeg' }
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
      [System.Drawing.Imaging.Encoder]::Quality, [long]90)
    $bmp.Save((Join-Path (Get-Location) $Dst), $codec, $ep)
    $bmp.Dispose()

    $fx = [math]::Round(($Mx - $left) / $cw * 100, 1)
    $fy = [math]::Round(($My - $top)  / $ch * 100, 1)
    "{0,-34} recorte {1}x{2} @ ({3},{4})  boca em {5}% x {6}%" -f `
      (Split-Path $Dst -Leaf), [int]$cw, [int]$ch, [int]$left, [int]$top, $fx, $fy
  }
  finally { $img.Dispose() }
}
