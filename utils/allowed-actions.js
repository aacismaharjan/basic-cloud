export const allowedActions = {
  uptime: { cmd: "uptime" }, // 1. Shows system uptime and load
  disk: { cmd: "df -h" }, // 2. Shows disk usage
  memory: { cmd: "free -h" }, // 3. Shows memory usage
  users: { cmd: "who" }, // 4. Shows logged-in users
  processes: { cmd: "ps aux --sort=-%mem | head -n 10" }, // 5. Top 10 memory-consuming processes
  listFiles: { cmd: "ls -lh" }, // 6. List files in current directory
  createFile: { cmd: "touch newfile.txt" }, // 7. Safely create a new empty file
  hostname: { cmd: "hostname" }, // 8. Shows the system hostname
  osInfo: { cmd: "uname -a" }, // 9. OS and kernel info
  network: { cmd: "ip a" }, // 10. Show network interfaces and IPs
  ls: { cmd: "ls" },
  cd: { cmd: "cd" },
};
