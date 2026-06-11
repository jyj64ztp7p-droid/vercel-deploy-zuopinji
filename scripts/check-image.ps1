Add-Type -AssemblyName System.Drawing
$p = $args[0]
$i = [System.Drawing.Image]::FromFile($p)
Write-Host "$($i.Width)x$($i.Height)"
$i.Dispose()
