Let's say: 

> Kali Linux on Oracle VirtualBox
> You want your **laptop (Windows)** to connect to **Kali** as an SSH **server**

✅ That means:

* **Kali = Server (inside VirtualBox)**
* **Windows = Client (your laptop)**

---

### ⚙️ Step-by-step Setup

#### 🧩 Step 1. Enable & install OpenSSH Server in Kali

Open a terminal in Kali and run:

```bash
sudo apt update
sudo apt install openssh-server -y
```

Enable and start SSH service:

```bash
sudo systemctl enable ssh
sudo systemctl start ssh
```

Check it’s running:

```bash
sudo systemctl status ssh
```

You should see **“active (running)”**.

---

#### 🌐 Step 2. Set up network for VirtualBox (so Windows can reach Kali)

You have two options:

##### Option A: **NAT + Port Forwarding (Recommended if no LAN)**

1. In **VirtualBox**, select your Kali VM → **Settings → Network**
2. Adapter 1 → Attached to: **NAT**
3. Click **Advanced → Port Forwarding**

Add a rule:

| Name | Protocol | Host IP   | Host Port | Guest IP  | Guest Port |
| ---- | -------- | --------- | --------- | --------- | ---------- |
| SSH  | TCP      | 127.0.0.1 | 2222      | 10.0.2.15 | 22         |

> `10.0.2.15` is the default Kali IP for NAT (verify using `ip a` inside Kali).

---

##### Option B: **Bridged Adapter (if on same network)**

1. Adapter 1 → Attached to: **Bridged Adapter**
2. Select your Wi-Fi or Ethernet adapter.
3. Boot Kali and check IP with:

   ```bash
   ip a
   ```

   Example: `192.168.1.105`

Then you can SSH directly to that IP.

---

#### 💻 Step 3. Connect from Windows to Kali

**Using PowerShell or CMD:**

If using **Port Forwarding (NAT)**:

```powershell
ssh kali@127.0.0.1 -p 2222
```

(Default user: `kali`, default password: `kali`)

---

#### 🧠 Quick Check

You can test SSH from Kali to itself:

```bash
ssh kali@localhost
```

If that works → network issue;
If not → SSH service/config issue.

