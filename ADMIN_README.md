# Admin Dashboard Documentation

## Overview

The admin dashboard provides a secure interface for viewing and managing event bookings and payments.

## Features

### 🔐 Authentication

- JWT-based secure login system
- Protected routes with middleware
- Automatic session management
- Secure logout functionality

### 📊 Dashboard Features

- **Real-time Statistics**: Total bookings, confirmed payments, pending transactions, and revenue
- **Advanced Filtering**: Search by customer name, email, phone, or order ID
- **Status Filtering**: Filter by payment status (PENDING, CONFIRMED, FAILED)
- **Tier Filtering**: Filter by ticket tier (REGULAR, VIP, VVIP)
- **Sorting Options**: Sort by date, amount, or customer name
- **Pagination**: Navigate through large datasets efficiently

### 📋 Booking Management

- View complete booking details
- Customer information display
- Order and payment ID tracking
- Amount and tier information
- Timestamp tracking
- Status badges for quick identification

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file with the following variables:

```env
# Admin Authentication
ADMIN_USERNAME="your-admin-username"
ADMIN_PASSWORD="your-secure-password"
JWT_SECRET="your-super-secret-jwt-key-at-least-32-characters-long"

# Database (required for booking data)
DATABASE_URL="your-postgresql-database-url"
```

### 2. Security Configuration

- Change the default admin credentials
- Use a strong JWT secret (32+ characters)
- Ensure HTTPS in production
- Regularly rotate passwords

### 3. Access URLs

- **Login**: `/admin`
- **Dashboard**: `/admin/dashboard` (protected)

## API Endpoints

### Authentication

- `POST /api/admin/auth` - Login
- `DELETE /api/admin/auth` - Logout

### Data Access

- `GET /api/admin/bookings` - Fetch booking data with filtering and pagination

## Security Features

### 🛡️ Protection Measures

- **JWT Authentication**: Secure token-based authentication
- **Middleware Protection**: Automatic route protection
- **Session Management**: Secure cookie handling
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **XSS Protection**: React's built-in XSS protection

### 🔒 Access Control

- Read-only access to booking data
- No modification capabilities (view-only dashboard)
- Automatic session expiration
- Secure password handling (bcrypt planned for future)

## Usage Guide

### 1. Login Process

1. Navigate to `/admin`
2. Enter admin credentials
3. Successful login redirects to dashboard

### 2. Dashboard Navigation

1. **Search**: Use the search bar to find specific bookings
2. **Filter**: Use dropdown filters for status and tier
3. **Sort**: Change sorting options for different views
4. **Paginate**: Use pagination controls for large datasets

### 3. Data Analysis

- View real-time statistics in the top cards
- Analyze booking patterns by status and tier
- Track revenue and conversion rates
- Monitor pending payments

## Technical Architecture

### Frontend

- **Next.js 15**: App Router with server components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Responsive design system
- **React Hooks**: State management

### Backend

- **API Routes**: Secure server-side endpoints
- **Prisma ORM**: Database operations
- **JWT**: Authentication tokens
- **Middleware**: Route protection

### Database

- **PostgreSQL**: Reliable data storage
- **Prisma Schema**: Type-safe database operations
- **Migrations**: Version-controlled schema changes

## Performance Optimizations

### 📈 Efficiency Features

- **Pagination**: Prevents large data loads
- **Debounced Search**: Reduces API calls
- **Optimistic Loading**: Smooth user experience
- **Cached Queries**: Improved response times

### 🎯 Best Practices

- Server-side filtering and sorting
- Minimal data transfer
- Responsive design for all devices
- Progressive loading states

## Troubleshooting

### Common Issues

1. **Login Failed**: Check environment variables
2. **Dashboard Not Loading**: Verify JWT secret configuration
3. **Data Not Showing**: Confirm database connection
4. **Permission Denied**: Check middleware configuration

### Debug Steps

1. Check browser console for errors
2. Verify environment variables are set
3. Check database connectivity
4. Review server logs for authentication issues

## Future Enhancements

### Planned Features

- [ ] Password hashing with bcrypt
- [ ] Role-based access control
- [ ] Export functionality (CSV/PDF)
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Booking modification capabilities
- [ ] Refund management
- [ ] Audit logging

### Security Improvements

- [ ] Two-factor authentication
- [ ] Rate limiting
- [ ] IP whitelisting
- [ ] Session timeout configuration
- [ ] Advanced password policies

## Support

For technical support or questions about the admin dashboard:

1. Check this documentation first
2. Review environment variable configuration
3. Verify database connectivity
4. Check application logs for errors

---

**Note**: This is a read-only dashboard designed for monitoring and analysis. For booking modifications, contact the development team.
