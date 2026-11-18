# Reproduz como o comparador exibia o caso 3 ANTES da correcao (quadro 4:3,
# object-cover centralizado em cada foto) e compara com o resultado atual.
Add-Type -AssemblyName System.Drawing

$W = 1200; $H = 900   # quadro antigo, 4:3

function Recorte-Centralizado {
  param([string]$Src, [int]$OutW, [int]$OutH)
  $img = [System.Drawing.Image]::FromFile((Resolve-Path $Src).Path)
  $sw = [double]$img.Width; $sh = [double]$img.Height
  $alvo = $OutW / [double]$OutH
  $cw = $sw; $ch = $cw / $alvo
  if ($ch -gt $sh) { $ch = $sh; $cw = $ch * $alvo }
  $left = ($sw - $cw) / 2.0
  $top  = ($sh - $ch) / 2.0
  $bmp = New-Object System.Drawing.Bitmap($OutW, $OutH)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0,0,$OutW,$OutH)),
               [single]$left, [single]$top, [single]$cw, [single]$ch,
               [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose(); $img.Dispose()
  return $bmp
}

function Emenda {
  param($A, $B, [int]$OutW, [int]$OutH, [string]$Rotulo)
  $bmp = New-Object System.Drawing.Bitmap($OutW, $OutH)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $meio = [int]($OutW / 2); $resto = $OutW - $meio
  $g.DrawImage($A, (New-Object System.Drawing.Rectangle(0,0,$meio,$OutH)), 0, 0, $meio, $OutH, [System.Drawing.GraphicsUnit]::Pixel)
  $g.DrawImage($B, (New-Object System.Drawing.Rectangle($meio,0,$resto,$OutH)), $meio, 0, $resto, $OutH, [System.Drawing.GraphicsUnit]::Pixel)
  $penDiv = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 3)
  $g.DrawLine($penDiv, $meio, 0, $meio, $OutH)
  $fonte = New-Object System.Drawing.Font('Segoe UI', 30, [System.Drawing.FontStyle]::Bold)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(200,20,20,20))), 0, 0, $OutW, 62)
  $g.DrawString($Rotulo, $fonte, [System.Drawing.Brushes]::White, 18, 12)
  $g.Dispose()
  return $bmp
}

# ANTES: quadro 4:3 sobre os arquivos originais
$aVelho = Recorte-Centralizado 'public/img/mulher-antes.jpeg' $W $H
$dVelho = Recorte-Centralizado 'public/img/mulher-depos.jpeg' $W $H
$velho  = Emenda $aVelho $dVelho $W $H 'ANTES DA CORRECAO - a boca salta de altura na emenda'

# DEPOIS: os arquivos ja normalizados
$aNovo = Recorte-Centralizado 'public/img/casos/caso-3-antes.jpg' $W $H
$dNovo = Recorte-Centralizado 'public/img/casos/caso-3-depois.jpg' $W $H
$novo  = Emenda $aNovo $dNovo $W $H 'DEPOIS DA CORRECAO - a linha dos labios atravessa reta'

$final = New-Object System.Drawing.Bitmap($W, ($H * 2 + 12))
$g = [System.Drawing.Graphics]::FromImage($final)
$g.Clear([System.Drawing.Color]::White)
$g.DrawImage($velho, 0, 0, $W, $H)
$g.DrawImage($novo,  0, ($H + 12), $W, $H)
$g.Dispose()

$saida = Join-Path $env:TEMP 'comparacao-da-correcao.jpg'
$final.Save($saida, [System.Drawing.Imaging.ImageFormat]::Jpeg)
foreach ($b in @($aVelho,$dVelho,$velho,$aNovo,$dNovo,$novo,$final)) { $b.Dispose() }
$saida
