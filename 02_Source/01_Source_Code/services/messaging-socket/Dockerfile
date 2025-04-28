FROM node:20-alpine


# Tạo thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài các package
RUN npm install

# Cài thêm tsx (rất quan trọng ở đây)
RUN npm install -g tsx

# Copy toàn bộ project vào container
COPY . .

# Mở port
EXPOSE 3010/tcp

# Lệnh start
CMD ["npm", "run", "start"]

