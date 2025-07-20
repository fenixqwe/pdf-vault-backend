## Вимоги

- Node.js >= 18
- npm
- Docker (для бази даних)

## Кроки для встановлення та запуску

### 1. Клонувати репозиторій

```bash
git clone https://github.com/fenixqwe/pdf-vault-backend.git
```

### 2. Встановити залежності у кожному проєкті

#### Загальна бібліотека

```bash
cd common-lib
npm install
```

#### Сервіс користувачів

```bash
cd soa-user-backend
npm install
```

#### Сервіс документів

```bash
cd soa-documents-backend
npm install
```

### 3. Підняти базу даних Oracle через Docker

У кореневій директорії:

```bash
docker-compose up -d
```

База даних буде доступна на порту 1521

### 4. Налаштування .env для кожного сервісу

#### Для soa-user-backend/.env

```ini
PORT=5001
DB_NAME=XEPDB1
DB_USER=SYSTEM
DB_PASSWORD=12345
DB_HOST=localhost
DB_PORT=1521
SECRET_KEY=Y`ÝÂM\Ùý+Þ2ãÁÈ8ð

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

CLIENT_URL=http://localhost:5173
```

#### Для soa-documents-backend/.env

```ini
PORT=5000
DB_NAME=XEPDB1
DB_USER=SYSTEM
DB_PASSWORD=12345
DB_HOST=localhost
DB_PORT=1521
SECRET_KEY=Y`ÝÂM\Ùý+Þ2ãÁÈ8ð
USER_SERVICE_URL=http://localhost:5001
```

### 5. Запуск сервісів

#### Користувачі:

```bash
cd soa-user-backend
npm run dev
```

#### Документи:

```bash
cd soa-documents-backend
npm run dev
```

## Додаткова інформація
Під час першого старту soa-user-backend буде автоматично створено ролі (USER, ADMIN), а якщо немає жодного користувача — буде створено дефолтного адміна:

### Email
```ini
admin@gmail.com
```

### Password
```ini
12345678
```