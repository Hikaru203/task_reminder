$mavenUrl = "https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip"
$output = "maven.zip"
$destination = ".\tools"

Write-Host "Checking for Maven..."
if (Get-Command "mvn" -ErrorAction SilentlyContinue) {
    Write-Host "Maven is already installed globally."
    exit
}

if (-not (Test-Path $destination)) {
    New-Item -ItemType Directory -Force -Path $destination | Out-Null
}

# Check if already installed locally
$localMaven = Get-ChildItem -Path $destination -Filter "apache-maven*" | Select-Object -First 1
if ($localMaven) {
    Write-Host "Maven is already installed locally at $($localMaven.FullName)"
    exit
}

Write-Host "Downloading Maven from $mavenUrl..."
try {
    Invoke-WebRequest -Uri $mavenUrl -OutFile $output
} catch {
    Write-Error "Failed to download Maven. Please check your internet connection."
    exit 1
}

Write-Host "Extracting Maven..."
Expand-Archive -Path $output -DestinationPath $destination -Force
Remove-Item $output

Write-Host "Maven installation complete."
