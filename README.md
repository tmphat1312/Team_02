# Property Search Service

Dịch vụ tìm kiếm bất động sản sử dụng Spring Boot và Elasticsearch.

## Công nghệ sử dụng

- Java 17
- Spring Boot 3.2.3
- Elasticsearch 8.12.2
- PostgreSQL
- Docker & Docker Compose

## Cách hoạt động

Dịch vụ này có các chức năng chính sau:

1. **Đồng bộ dữ liệu**: 
   - Tự động đồng bộ dữ liệu từ PostgreSQL sang Elasticsearch mỗi 5 phút
   - Sử dụng cơ chế batch processing để xử lý hiệu quả
   - Có retry mechanism khi gặp lỗi

2. **Tìm kiếm bất động sản**:
   - Tìm kiếm theo từ khóa (title, description)
   - Lọc theo giá, vị trí, loại bất động sản
   - Hỗ trợ tìm kiếm theo khoảng cách (geo-search)

3. **Monitoring**:
   - Theo dõi số lượng sync thành công/thất bại
   - Đo lường thời gian sync
   - Logging chi tiết

## Cài đặt và Chạy

### Yêu cầu

- Docker và Docker Compose
- JDK 17
- Maven

### Chạy với Docker

1. Clone repository:
```bash
git clone <repository-url>
cd Team_02
```

2. Chạy các service với Docker Compose:
```bash
docker-compose up -d
```

Các service sẽ được chạy:
- PostgreSQL: localhost:5432
- Elasticsearch: localhost:9200
- Property Search Service: localhost:8082

### Chạy ứng dụng locally

1. Đảm bảo PostgreSQL và Elasticsearch đang chạy:
```bash
docker-compose up -d postgres elasticsearch
```

2. Build và chạy ứng dụng:
```bash
cd 02_Source/01_Source_Code/services/search
./mvnw clean install
./mvnw spring-boot:run
```

## Cấu hình

Các cấu hình chính trong `application.yml`:

```yaml
server:
  port: 8082

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/rento-property
    username: rento-property_owner
    password: your_password

  elasticsearch:
    uris: localhost:9200

sync:
  elasticsearch:
    enabled: true
    cron: "0 0/5 * * * ?"  # Chạy mỗi 5 phút
    batch-size: 100
```

## API Endpoints

### Tìm kiếm bất động sản

```
GET /api/properties/search
```

Query parameters:
- `query`: Từ khóa tìm kiếm
- `minPrice`: Giá tối thiểu
- `maxPrice`: Giá tối đa
- `location`: Vị trí
- `propertyType`: Loại bất động sản
- `page`: Số trang (mặc định: 0)
- `size`: Số item mỗi trang (mặc định: 10)

### Kiểm tra trạng thái đồng bộ

```
GET /api/sync/status
```

## Monitoring

- Metrics được expose qua Actuator endpoint: `/actuator`
- Logs được lưu trong thư mục `logs/`
- Có thể theo dõi trạng thái đồng bộ qua API endpoint

## Xử lý lỗi

- Các lỗi đồng bộ được retry tối đa 3 lần
- Failed records được log lại để xử lý sau
- Có monitoring để phát hiện vấn đề sớm
