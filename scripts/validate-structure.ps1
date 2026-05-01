# Script de validación de conformidad estructural (PL-008)
# Ejecutar antes de PRs mayores

Write-Host "=== Validación de Estructura - PL-008 ===" -ForegroundColor Cyan

$errors = 0

# 1. Verificar que existan frontend/ y backend/
if (-not (Test-Path "frontend/")) {
    Write-Host "❌ ERROR: Falta carpeta frontend/" -ForegroundColor Red
    $errors++
} else {
    Write-Host "✅ frontend/ existe" -ForegroundColor Green
}

if (-not (Test-Path "backend/")) {
    Write-Host "❌ ERROR: Falta carpeta backend/" -ForegroundColor Red
    $errors++
} else {
    Write-Host "✅ backend/ existe" -ForegroundColor Green
}

# 2. Verificar que NO haya código ejecutable en .drfic/
$drficCode = Get-ChildItem -Path ".drfic" -Recurse -Include "*.ts","*.tsx","*.js" -ErrorAction SilentlyContinue
if ($drficCode.Count -gt 0) {
    Write-Host "❌ ERROR: Hay archivos de código en .drfic/" -ForegroundColor Red
    $drficCode | ForEach-Object { Write-Host "  - $_" }
    $errors++
} else {
    Write-Host "✅ No hay código ejecutable en .drfic/" -ForegroundColor Green
}

# 3. Verificar separación de specs/
if (-not (Test-Path "specs/")) {
    Write-Host "❌ ERROR: Falta carpeta specs/" -ForegroundColor Red
    $errors++
} else {
    Write-Host "✅ specs/ existe" -ForegroundColor Green
}

# 4. Verificar archivos clave de plan
$planPath = "specs/001-plataforma-inversiones-ia/plan.md"
if (-not (Test-Path $planPath)) {
    Write-Host "❌ ERROR: Falta $planPath" -ForegroundColor Red
    $errors++
} else {
    $planContent = Get-Content $planPath -Raw
    if ($planContent -match "PL-004|PL-008") {
        Write-Host "✅ plan.md contiene PL-004/PL-008" -ForegroundColor Green
    } else {
        Write-Host "⚠️ ADVERTENCIA: plan.md no referencia PL-004/PL-008" -ForegroundColor Yellow
    }
}

# 5. Verificar que frontend/backend no contengan archivos de documentación de gobierno
$frontendDocs = Get-ChildItem -Path "frontend" -Recurse -Include "*.md" -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notmatch "node_modules" }
$backendDocs = Get-ChildItem -Path "backend" -Recurse -Include "*.md" -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notmatch "node_modules" }

if ($frontendDocs.Count -gt 1 -or $backendDocs.Count -gt 1) {
    Write-Host "⚠️ ADVERTENCIA: frontend/backend contienen documentación adicional" -ForegroundColor Yellow
}

Write-Host "`n=== Resultado: $errors error(es) ===" -ForegroundColor Cyan

if ($errors -eq 0) {
    Write-Host "✅ Estructura conforme a PL-004 y PL-008" -ForegroundColor Green
    exit 0
} else {
    Write-Host "❌ Estructura NO conforme" -ForegroundColor Red
    exit 1
}
