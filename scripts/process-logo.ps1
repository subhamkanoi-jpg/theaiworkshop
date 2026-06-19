Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Varun B\Documents\GitHub\theaiworkshop\public\logo.png.png"
$outDir  = "C:\Users\Varun B\Documents\GitHub\theaiworkshop\public"

$src = New-Object System.Drawing.Bitmap $srcPath
$w = $src.Width
$h = $src.Height

# Lock bits as 32bpp ARGB (memory order is B,G,R,A per pixel).
$rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
$data = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $data.Stride
$bytes = New-Object byte[] ($stride * $h)
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)

# Track content bounding box and per-column occupancy (for icon/text split).
$minX = $w; $minY = $h; $maxX = -1; $maxY = -1
$colFilled = New-Object bool[] $w

for ($y = 0; $y -lt $h; $y++) {
  $row = $y * $stride
  for ($x = 0; $x -lt $w; $x++) {
    $i = $row + $x * 4
    $b = $bytes[$i]; $g = $bytes[$i+1]; $r = $bytes[$i+2]
    $minc = [Math]::Min($r, [Math]::Min($g, $b))

    # White-key: pure background -> transparent, near-white -> feathered,
    # everything coloured/dark stays fully opaque (saturated colours have a
    # low min channel, so the gradient icon is preserved).
    if ($minc -ge 240) {
      $alpha = 0
    } elseif ($minc -ge 215) {
      $alpha = [int](255 * (240 - $minc) / 25)
    } else {
      $alpha = 255
    }
    $bytes[$i+3] = [byte]$alpha

    if ($alpha -gt 20) {
      if ($x -lt $minX) { $minX = $x }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($y -gt $maxY) { $maxY = $y }
      $colFilled[$x] = $true
    }
  }
}

[System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytes.Length)
$src.UnlockBits($data)

"content bbox: x[$minX..$maxX] y[$minY..$maxY]"

# Find the gap between the icon (left cluster) and the wordmark: the first run
# of empty columns, at least 1.5% of width wide, after content begins.
$gapStart = -1; $gapEnd = -1; $run = 0; $minGap = [int]($w * 0.015)
for ($x = $minX; $x -le $maxX; $x++) {
  if (-not $colFilled[$x]) {
    if ($run -eq 0) { $runStart = $x }
    $run++
  } else {
    if ($run -ge $minGap -and $gapStart -lt 0 -and $runStart -gt $minX) {
      $gapStart = $runStart; $gapEnd = $x - 1
    }
    $run = 0
  }
}
"icon/text gap: $gapStart..$gapEnd"

function Save-Crop($bmp, $x0, $y0, $x1, $y1, $path) {
  $pad = 6
  $cx = [Math]::Max(0, $x0 - $pad)
  $cy = [Math]::Max(0, $y0 - $pad)
  $cw = [Math]::Min($bmp.Width - $cx, ($x1 - $x0) + 2 * $pad)
  $ch = [Math]::Min($bmp.Height - $cy, ($y1 - $y0) + 2 * $pad)
  $crect = New-Object System.Drawing.Rectangle $cx, $cy, $cw, $ch
  $crop = $bmp.Clone($crect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $crop.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $crop.Dispose()
  "saved $path  ($cw x $ch)"
}

# Full lockup (tight crop of everything).
Save-Crop $src $minX $minY $maxX $maxY (Join-Path $outDir "logo.png")

# Icon only (left of the gap), if a clean gap was found.
if ($gapStart -gt 0) {
  Save-Crop $src $minX $minY ($gapStart - 1) $maxY (Join-Path $outDir "logo-icon.png")
} else {
  "no gap found; skipped icon-only crop"
}

$src.Dispose()
