$outputFile = "c:\Users\DELL\Desktop\prjt\tous_les_codes.md"
Remove-Item -Force -ErrorAction Ignore $outputFile

$files = Get-ChildItem -Path c:\Users\DELL\Desktop\prjt\event-app\src -File -Recurse -Include *.ts, *.html, *.css | Where-Object { $_.FullName -notmatch "node_modules|\.spec\.ts" }

foreach ($f in $files) {
    if ($f.Name -match "^(main\.ts|test\.ts|polyfills\.ts)$") { continue }
    
    $relativePath = $f.FullName.Replace("C:\Users\DELL\Desktop\prjt\event-app\", "").Replace("\", "/")
    $ext = $f.Extension.TrimStart(".")
    $lang = "typescript"
    if ($ext -eq "html") { $lang = "html" } 
    if ($ext -eq "css") { $lang = "css" }
    
    Add-Content -Path $outputFile "### $relativePath"
    Add-Content -Path $outputFile "````$lang"
    Get-Content $f.FullName | Add-Content -Path $outputFile
    Add-Content -Path $outputFile "````"
    Add-Content -Path $outputFile ""
}
