@echo off
REM LogisRoute CLI Launcher - Fix DLL conflict
REM Pastikan file ini ada di folder yang sama dengan main.exe

set PATH=C:\msys64\ucrt64\bin;%PATH%
main.exe
pause
