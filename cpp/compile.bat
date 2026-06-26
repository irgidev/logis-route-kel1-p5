@echo off
cd /d "C:\Documents\Desktop\Project\proyek_strukdat\cpp"
g++ -o main.exe main.cpp -std=c++17 -O2
echo GPP_RC=%ERRORLEVEL%
dir main.exe
