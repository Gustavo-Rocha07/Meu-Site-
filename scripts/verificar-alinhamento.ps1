# Monta, para cada caso, a imagem que o comparador exibe com o divisor no meio:
# metade esquerda = ANTES, metade direita = DEPOIS.
# Se a linha dos labios cruzar a emenda sem degrau, o par esta alinhado.
Add-Type -AssemblyName System.Drawing

$dir = 'public/img/casos'
$out = Join-Path $env:TEMP 'checagem-alinhamento'
New-Item -ItemType Directory -Force -Path $out | Out-Null

foreach ($n in 1..3) {
  $a = [System.Drawing.Image]::FromFile((Resolve-Path "$dir/caso-$n-antes.jpg").Path)
  $b = [System.Drawing.Image]::FromFile((Resolve-Path "$dir/caso-$n-depois.jpg").Path)

  $bmp = New-Object System.Drawing.Bitmap($a.Width, $a.Height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $half = [int]($a.Width / 2)
  $rest = $a.Width - $half

  $g.DrawImage($a, (New-Object System.Drawing.Rectangle(0, 0, $half, $a.Height)),
               0, 0, $half, $a.Height, [System.Drawing.GraphicsUnit]::Pixel)
  $g.DrawImage($b, (New-Object System.Drawing.Rectangle($half, 0, $rest, $a.Height)),
               $half, 0, $rest, $a.Height, [System.Drawing.GraphicsUnit]::Pixel)

  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::Cyan, 3)
  $g.DrawLine($pen, $half, 0, $half, $a.Height)
  $g.Dispose(); $a.Dispose(); $b.Dispose()

  $p = Join-Path $out "caso-$n-emenda.jpg"
  $bmp.Save($p, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $bmp.Dispose()
  $p
}
