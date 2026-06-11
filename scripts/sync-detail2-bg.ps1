$ErrorActionPreference = "Continue"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$out = Join-Path $root "assets\images\detail2-right-bg.png"
$url = "https://www.figma.com/api/mcp/asset/c7a9a25c-99d8-4326-aa3d-ee01a0949f7b"
Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -TimeoutSec 180
Write-Host "OK detail2-right-bg.png ($((Get-Item $out).Length) bytes)"
