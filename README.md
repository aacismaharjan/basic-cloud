Use case 
```bash

Invoke-RestMethod -Uri "http://127.0.0.1:3000/ssh/exec" -Method Post -Headers @{ "x-api-key"="don"; "Content-Type"="application/json" } -Body (@{ action="disk" } | ConvertTo-Json)
```

```cmd
curl -X POST "http://127.0.0.1:3000/ssh/exec" -H "x-api-key: don" -H "Content-Type: application/json" -d '{"action":"disk"}'

```

---

### **1️⃣ Compute Service**
```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:3000/ec2/compute" -Method POST -Headers @{ "x-api-key"="don"; "Content-Type"="application/json" } -Body (@{ operation="add"; a=5; b=10 } | ConvertTo-Json)
```

### **2️⃣ Message Storage Service**  

**Store a message:**
```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:3000/s3/store" -Method POST -Headers @{ "x-api-key"="don"; "Content-Type"="application/json" } -Body (@{ message="Hello World" } | ConvertTo-Json)
```

**Get all messages:**
```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:3000/s3/messages" -Method GET -Headers @{ "x-api-key"="don" }
```  
