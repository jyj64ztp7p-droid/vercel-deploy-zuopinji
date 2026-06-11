# Sync assets from Figma file J4xqvKDdovjbg0C3mUETBg (generated 2026-06-06)
$ErrorActionPreference = "Continue"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$imgDir = Join-Path $root "assets\images"
$gifDir = Join-Path $root "assets\gifs"
New-Item -ItemType Directory -Force -Path $imgDir, $gifDir | Out-Null

function Save-FigmaAsset {
  param(
    [string]$Url,
    [string]$OutPath
  )
  $dir = Split-Path -Parent $OutPath
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  try {
    Invoke-WebRequest -Uri $Url -OutFile $OutPath -UseBasicParsing -TimeoutSec 180
    $size = (Get-Item $OutPath).Length
    if ($size -lt 100) { throw "File too small ($size bytes)" }
    Write-Host "OK $(Split-Path -Leaf $OutPath) ($size bytes)"
    return $true
  } catch {
    Write-Host "FAIL $(Split-Path -Leaf $OutPath): $_"
    return $false
  }
}

# Format: @{ "relative/path" = "figma-mcp-url" }
$assets = [ordered]@{
  # --- 1.1 Home (node 1:516) ---
  "images/home-bg.png" = "https://www.figma.com/api/mcp/asset/d5e38a03-941d-4eaf-8207-75c58998ce63"
  "images/home-title.png" = "https://www.figma.com/api/mcp/asset/2a791688-4c78-426e-9823-06ed9e99662d"
  "images/gif-home.png" = "https://www.figma.com/api/mcp/asset/764a0b72-9985-4b94-8d8e-5e9e4750e9b7"
  "images/music-cover.png" = "https://www.figma.com/api/mcp/asset/5b7af676-2c4d-4b69-82a5-0b5994d2d387"
  "images/avatar.png" = "https://www.figma.com/api/mcp/asset/d55bb18f-584b-468a-b290-3b0e875ed6b2"
  "images/play-icon.svg" = "https://www.figma.com/api/mcp/asset/79470ea9-c0d7-45ff-a6a8-ffbcb5442c0f"
  "images/timeline-frame5.svg" = "https://www.figma.com/api/mcp/asset/0c472396-6637-4b7a-853c-5c821d736b7b"
  "images/timeline-frame6.svg" = "https://www.figma.com/api/mcp/asset/0aa5c5a8-e6f8-4718-b3f8-4f27204dfa19"
  "images/home-carousel-1.2.png" = "https://www.figma.com/api/mcp/asset/5db7ba17-a0f0-4d3d-8ba5-6263ae6c33a7"
  "images/home-carousel-1.3.png" = "https://www.figma.com/api/mcp/asset/ae8529cf-0ede-41cc-b122-9d8b8b87f12b"
  "images/home-carousel-1.4.png" = "https://www.figma.com/api/mcp/asset/dd3ba170-8c71-4c1e-972e-796f14d5456f"
  "images/home-carousel-1.5.png" = "https://www.figma.com/api/mcp/asset/862d6b17-69b8-41f5-a4ac-88a03775b8cf"
  "gifs/home-carousel-1.5-deco.gif" = "https://www.figma.com/api/mcp/asset/5702efb4-9061-4cf6-a842-720a139c957c"
  "images/home-carousel-1.6.png" = "https://www.figma.com/api/mcp/asset/1aca5332-5dbc-4b13-8f98-88032c15a500"

  # --- 1.2 Detail (node 70:22) ---
  "images/detail1-left.png" = "https://www.figma.com/api/mcp/asset/cee6928b-9813-44f7-82e3-b9be3f78868a"
  "images/detail1-right-title.png" = "https://www.figma.com/api/mcp/asset/1593becc-8de9-4877-8e3e-6064364166f0"
  "images/detail1-right-pic.png" = "https://www.figma.com/api/mcp/asset/3b409cc7-8e86-4930-83da-34dbc305324a"
  "gifs/detail1-gif-a.gif" = "https://www.figma.com/api/mcp/asset/f76c510e-4b2d-4035-99a8-033679562512"
  "gifs/detail1-gif-b.gif" = "https://www.figma.com/api/mcp/asset/c276c01a-d3ad-47f1-8690-ed8481badb18"
  "images/divider-h.svg" = "https://www.figma.com/api/mcp/asset/d469cbb9-b30e-4ef0-a621-896fa04d8eb7"
  "images/divider-v.svg" = "https://www.figma.com/api/mcp/asset/f513a826-5cf0-424b-a5e9-73cd9868a840"

  # --- 1.3 Detail (node 132:379) ---
  "images/detail2-left.png" = "https://www.figma.com/api/mcp/asset/79d8353e-86bf-4a8c-9238-c02a37773711"
  "images/detail2-right-01.png" = "https://www.figma.com/api/mcp/asset/9a23c8b6-4edf-4f20-a908-eb4055143a0b"
  "images/detail2-right-pic1.png" = "https://www.figma.com/api/mcp/asset/58488043-6034-4802-aaa5-fa1cfd971b27"
  "images/detail2-right-pic2.png" = "https://www.figma.com/api/mcp/asset/6b30f692-bc30-4259-9b72-33cc9bb73688"
  "images/detail2-right-pic3.png" = "https://www.figma.com/api/mcp/asset/879ebd18-4958-4e11-8854-efb0819e4bab"
  "images/detail2-right-bg.png" = "https://www.figma.com/api/mcp/asset/c7a9a25c-99d8-4326-aa3d-ee01a0949f7b"
  "gifs/detail2-gif-01.gif" = "https://www.figma.com/api/mcp/asset/ee937ca7-5e7c-429c-a80e-d9bd4b9cc2ab"
  "gifs/detail2-gif-2.gif" = "https://www.figma.com/api/mcp/asset/262fb1b4-64a5-4cda-91cf-be7f22ff89ba"
  "images/detail2-riso-texture.png" = "https://www.figma.com/api/mcp/asset/b9e74970-317d-4d52-9ad0-35101647a912"

  # --- 1.4 Detail (node 118:272) ---
  "images/detail3-left.png" = "https://www.figma.com/api/mcp/asset/db316e34-fa4f-45bc-988d-d0e2b7c55c34"
  "images/detail3-right-title.png" = "https://www.figma.com/api/mcp/asset/b85650d5-ee8c-402d-a86f-7f58c8164500"
  "images/detail3-right-pic1.png" = "https://www.figma.com/api/mcp/asset/6a409927-bf33-4b3c-a02a-28c13f4d97db"
  "images/detail3-right-pic2.png" = "https://www.figma.com/api/mcp/asset/b8c67737-dc45-4d48-9b96-f6113562c97d"
  "gifs/detail3-gif1.gif" = "https://www.figma.com/api/mcp/asset/3d2795a2-df19-4e1d-93f6-4cf341a8b8c0"
  "gifs/detail3-gif2.gif" = "https://www.figma.com/api/mcp/asset/5ccb083e-5482-4c6c-b9e0-009a0f30dc01"
  "gifs/detail3-gif3.gif" = "https://www.figma.com/api/mcp/asset/217d45e7-c14e-4761-98c9-fe4d5304553a"
  "images/detail3-divider-group.svg" = "https://www.figma.com/api/mcp/asset/9a355aee-1848-4905-9523-a9ae02ca083d"

  # --- 1.5 Detail (node 20:313) ---
  "images/detail4-left.png" = "https://www.figma.com/api/mcp/asset/9a8615b8-2115-406a-a055-5a162e5d71df"
  "images/detail4-right-title.png" = "https://www.figma.com/api/mcp/asset/3cfff513-a32d-43f6-ab1f-64527a2b935e"
  "images/detail4-right-pic1.png" = "https://www.figma.com/api/mcp/asset/9940c218-cc6f-4011-a15d-b0a3344a9744"
  "images/detail4-right-pic2.png" = "https://www.figma.com/api/mcp/asset/f596bf7a-4db3-46a2-8ead-edf931605d25"
  "images/detail4-right-pic3.png" = "https://www.figma.com/api/mcp/asset/a87719bc-18c9-48af-bddb-f43364e73b8b"
  "gifs/detail4-gif1.gif" = "https://www.figma.com/api/mcp/asset/67f00439-96cf-49dc-8b4d-b49f8332c719"
  "gifs/detail4-gif2.gif" = "https://www.figma.com/api/mcp/asset/f7ed3034-183b-442b-a041-b1a31faae655"

  # --- 1.6 Detail (node 98:15) ---
  "images/detail5-left.png" = "https://www.figma.com/api/mcp/asset/515c0111-3c85-4dc1-af89-3d398757acfd"
  "images/detail5-right-title.png" = "https://www.figma.com/api/mcp/asset/f40493fc-c408-4b08-878c-6a02c5fa3e28"
  "images/detail5-right-pic01.png" = "https://www.figma.com/api/mcp/asset/910cb1fb-a08d-49d7-99c5-68f93b3d5203"
  "images/detail5-right-pic02.png" = "https://www.figma.com/api/mcp/asset/ce68abd1-250a-4822-9bb2-d3efe5b9901f"
  "images/detail5-right-pic03.png" = "https://www.figma.com/api/mcp/asset/be1889b7-4c16-4113-bdc9-ffc381241d9a"
  "images/detail5-right-pic04.png" = "https://www.figma.com/api/mcp/asset/cddec1f5-7769-4dbe-a986-eea0016fb7cd"
  "gifs/detail5-gif-statue.gif" = "https://www.figma.com/api/mcp/asset/ff51ab26-9ef0-4ade-b094-88eeb9853d47"
  "gifs/detail5-gif-galaxy.gif" = "https://www.figma.com/api/mcp/asset/ec498438-0a3b-4128-9430-abf61b70eeba"
  "images/detail5-divider-group.svg" = "https://www.figma.com/api/mcp/asset/5ef6a4e1-8d53-45bc-8b1a-7babfc02bab0"
  "images/detail5-riso-texture.png" = "https://www.figma.com/api/mcp/asset/2364d0a8-fb87-46f3-9ccb-915e4f5c9bd0"

  # --- 1.8 About (node 152:407) ---
  "gifs/about-gif01.gif" = "https://www.figma.com/api/mcp/asset/a217f3e1-df12-4017-81f2-9df489104b69"
  "gifs/about-gif02.gif" = "https://www.figma.com/api/mcp/asset/c3dad3d3-dee6-464f-8250-55eb81e2efab"
  "images/about-pic01.png" = "https://www.figma.com/api/mcp/asset/89674f83-8e33-4ff3-8eb5-21c1dacec158"
  "images/about-pic02.png" = "https://www.figma.com/api/mcp/asset/61d46cab-f1cb-4936-8e17-79e25da94d16"
  "images/about-pic03.png" = "https://www.figma.com/api/mcp/asset/ad93cb9e-5d76-4f56-9b29-2e6b6ffa85ab"

  # --- 1.7 Index web3 group (node 159:137) ---
  "images/index-web3-home0319.png" = "https://www.figma.com/api/mcp/asset/00bf1508-0f93-488f-bd1c-8641c1be8cb4"
  "images/index-web3-home2.png" = "https://www.figma.com/api/mcp/asset/7e10a383-c71c-499e-9d2a-e995b88ccd5b"
  "images/index-web3-party.png" = "https://www.figma.com/api/mcp/asset/473e0af3-7229-432c-8a0f-6f5fb73f2e52"
  "images/index-web3-roadmap.png" = "https://www.figma.com/api/mcp/asset/3c1f9f56-92ba-4882-8ad7-066d6efcada5"
  "images/index-web3-nft-hero.png" = "https://www.figma.com/api/mcp/asset/58872d8e-1cf4-4667-b285-3534a5e065bb"
  "images/index-web3-nft-weapons.png" = "https://www.figma.com/api/mcp/asset/0330b8c7-72a4-4994-ada8-a116cee55d2d"
  "images/index-web3-staking.png" = "https://www.figma.com/api/mcp/asset/c80e964c-be6d-4921-b65b-a6172d84c182"
  "images/index-web3-pass.png" = "https://www.figma.com/api/mcp/asset/d1b44197-3ef4-4a79-96bc-35214b61e4cf"
  "images/index-web3-detail.png" = "https://www.figma.com/api/mcp/asset/4268055e-7d9b-41b1-b69c-c98d594daead"
  "images/index-web3-927.png" = "https://www.figma.com/api/mcp/asset/10767164-1b6d-4431-9b51-89d9e72280f4"
  "images/index-web3-home.png" = "https://www.figma.com/api/mcp/asset/c0ac5b7a-bd86-4a3b-83ed-90dead0c917a"
  "images/index-web3-event.png" = "https://www.figma.com/api/mcp/asset/833b0621-1480-46ed-8d9e-ac3146b5f2fa"
  "images/index-web3-listing.png" = "https://www.figma.com/api/mcp/asset/93f30f74-aec7-4d5c-8fa6-429488f18f7f"
  "images/index-web3-earn.png" = "https://www.figma.com/api/mcp/asset/f737d051-00f8-44a4-a00d-df6048644aa7"
  "images/index-web3-frame.png" = "https://www.figma.com/api/mcp/asset/868396bc-fabe-4523-8dea-b5d39e52c0c7"
  "images/index-web3-tall.png" = "https://www.figma.com/api/mcp/asset/47c1689d-6c8b-40ee-811c-38b2e6e9780d"
  "images/index-web3-collage.png" = "https://www.figma.com/api/mcp/asset/19c444ec-60ca-4f66-b9f0-c82baa27b03e"

  # --- 1.7 Index app group ---
  "images/index-app-2-3.png" = "https://www.figma.com/api/mcp/asset/f276b9dc-c18f-456e-ae05-e89180d93613"
  "images/index-app-shop.png" = "https://www.figma.com/api/mcp/asset/45e17553-27f3-4882-b000-55e683877fe7"
  "images/index-app-3-1.png" = "https://www.figma.com/api/mcp/asset/127b8a2e-3b40-49f5-832b-6a383d6413a8"
  "images/index-app-3-2.png" = "https://www.figma.com/api/mcp/asset/6cac803a-2f9e-4116-953f-c8956462cfaf"
  "images/index-app-msg.png" = "https://www.figma.com/api/mcp/asset/d067c2ed-3f9d-4817-98bb-4d366e0d11b6"
  "images/index-app-profile.png" = "https://www.figma.com/api/mcp/asset/5a9c48fc-1f18-4454-8df5-76b46cd8fb93"
  "images/index-app-assets.png" = "https://www.figma.com/api/mcp/asset/a783615d-c2df-46e3-a99a-2ad5a95d8f9b"
  "images/index-app-invite.png" = "https://www.figma.com/api/mcp/asset/30524f21-c218-445c-b603-fe753529c58e"
  "images/index-app-me.png" = "https://www.figma.com/api/mcp/asset/85ff36bc-e710-4565-8042-24ad8b1688bd"
  "images/index-app-44.png" = "https://www.figma.com/api/mcp/asset/7f3acf7e-c410-43a2-a154-5ad4615a99d4"
  "images/index-app-group133.png" = "https://www.figma.com/api/mcp/asset/f1898e06-5aed-4489-996f-cbbacd59952d"
  "images/index-app-activity.png" = "https://www.figma.com/api/mcp/asset/583aaa0c-b5cf-4c39-b2a8-d8dfb02fa777"
  "images/index-app-rank.png" = "https://www.figma.com/api/mcp/asset/6df019f9-1669-45de-97c5-892fbf8f8fed"
  "images/index-app-product.png" = "https://www.figma.com/api/mcp/asset/fd7d693b-e4f5-4442-af17-a6f8158e4fbe"
  "images/index-app-detail.png" = "https://www.figma.com/api/mcp/asset/6bc43eae-d0bf-4c21-8fdd-df4cc71c610a"
  "images/index-app-detail2.png" = "https://www.figma.com/api/mcp/asset/dcfd4333-1074-4826-8d73-f38ddd797269"

  # --- 1.7 Index web & large-screen group ---
  "images/index-web-board.png" = "https://www.figma.com/api/mcp/asset/ff3ecc72-0d20-4063-8236-6eb2b76d0e2a"
  "images/index-web-about.png" = "https://www.figma.com/api/mcp/asset/5177edef-72f2-4fa7-b22a-80c987bc7f32"
  "images/index-web-about2.png" = "https://www.figma.com/api/mcp/asset/eff95fee-e080-45e8-86aa-3f13e8a51991"
  "images/index-web-core.png" = "https://www.figma.com/api/mcp/asset/da824f36-be1a-4890-a960-955945205939"
  "images/index-web-core2.png" = "https://www.figma.com/api/mcp/asset/6e59ded2-fcc4-45fa-8e5c-9a4dcd8c981a"
  "images/index-web-security.png" = "https://www.figma.com/api/mcp/asset/aa134f78-75ca-4112-a62c-0de2f7031f9f"
  "images/index-web-phone.png" = "https://www.figma.com/api/mcp/asset/fc305972-4dd6-4c80-870e-706a1153ec19"

  # --- 1.7 Index h5 group ---
  "images/index-h5-1.png" = "https://www.figma.com/api/mcp/asset/ae42964f-17e2-4e75-95bb-e3913a9a8f61"
  "images/index-h5-1-3.png" = "https://www.figma.com/api/mcp/asset/077a8aee-903e-47bf-b865-436d92fdbc15"
  "images/index-h5-1-2.png" = "https://www.figma.com/api/mcp/asset/d182eeab-0299-4d9d-b6ca-dcc7916bd39c"
  "images/index-h5-square.png" = "https://www.figma.com/api/mcp/asset/00fddda8-e325-4e88-af80-cab954f737eb"
  "images/index-h5-health.png" = "https://www.figma.com/api/mcp/asset/89881805-2afc-46be-819a-c207f04c9fe2"
  "images/index-h5-shop.png" = "https://www.figma.com/api/mcp/asset/b5a741ec-88c0-4ac6-b7ed-10169417e0df"
  "images/index-h5-login.png" = "https://www.figma.com/api/mcp/asset/95a6f742-3142-4328-933d-c0d12cfcf28b"
  "images/index-h5-mine.png" = "https://www.figma.com/api/mcp/asset/465b3b1f-1a65-42af-a6f4-19048a2b51c1"
}

$ok = 0
$fail = 0
foreach ($kv in $assets.GetEnumerator()) {
  $out = Join-Path $root "assets\$($kv.Key)"
  if (Save-FigmaAsset -Url $kv.Value -OutPath $out) { $ok++ } else { $fail++ }
}

Write-Host ""
Write-Host "Done: $ok succeeded, $fail failed (total $($assets.Count))"
if ($fail -gt 0) { exit 1 }
