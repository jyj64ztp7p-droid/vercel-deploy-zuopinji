$ErrorActionPreference = "Continue"
$root = Join-Path (Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)) "assets"
$assets = [ordered]@{
  "gifs/detail3-gif1.gif" = "https://www.figma.com/api/mcp/asset/3d2795a2-df19-4e1d-93f6-4cf341a8b8c0"
  "gifs/detail4-gif1.gif" = "https://www.figma.com/api/mcp/asset/67f00439-96cf-49dc-8b4d-b49f8332c719"
  "gifs/about-gif01.gif" = "https://www.figma.com/api/mcp/asset/a217f3e1-df12-4017-81f2-9df489104b69"
  "gifs/about-gif02.gif" = "https://www.figma.com/api/mcp/asset/c3dad3d3-dee6-464f-8250-55eb81e2efab"
  "images/about-pic01.png" = "https://www.figma.com/api/mcp/asset/89674f83-8e33-4ff3-8eb5-21c1dacec158"
  "images/about-pic02.png" = "https://www.figma.com/api/mcp/asset/61d46cab-f1cb-4936-8e17-79e25da94d16"
  "images/about-pic03.png" = "https://www.figma.com/api/mcp/asset/ad93cb9e-5d76-4f56-9b29-2e6b6ffa85ab"
}

foreach ($rel in $assets.Keys) {
  $out = Join-Path $root $rel
  $dir = Split-Path -Parent $out
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  try {
    Invoke-WebRequest -Uri $assets[$rel] -OutFile $out -UseBasicParsing -TimeoutSec 180
    Write-Host "OK $rel ($((Get-Item $out).Length) bytes)"
  } catch {
    Write-Host "FAIL $rel : $_"
  }
}
