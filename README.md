# SignLearn - Sign Language Learning Platform

A comprehensive web application for learning sign language through interactive courses, quizzes, and personalized tutoring sessions.

## 🎯 Project Overview

SignLearn is a full-stack web application designed to make sign language learning accessible and engaging. The platform offers structured courses, interactive quizzes, progress tracking, and one-on-one tutoring sessions.

## ✨ Features

### 🔐 User Authentication
- User registration and login
- Secure password hashing with bcrypt
- Session-based authentication
- Protected routes and middleware

### 📚 Learning Courses
- **Course 1: Basic Signs** - Essential sign language gestures
- **Course 2: Intermediate Signs** - Family, food, and daily life signs
- Interactive image galleries with sign language demonstrations
- Progress tracking for each course and module

### 🧠 Interactive Learning
- Real-time progress tracking
- Interactive quizzes with scoring
- Practice sessions with immediate feedback
- Module-based learning structure

### 👨‍🏫 Tutoring System
- Book one-on-one sessions with certified tutors
- Multiple session types (basic, grammar, vocabulary, advanced)
- Tutor selection and scheduling
- Session management and tracking

### 📊 Dashboard & Analytics
- Personal learning dashboard
- Progress statistics and achievements
- Course completion tracking
- Learning streak monitoring

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcrypt** - Password hashing
- **express-session** - Session management

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling with Materialize CSS
- **JavaScript (ES6+)** - Client-side logic
- **Materialize CSS** - UI framework
- **Responsive Design** - Mobile-first approach

### Development Tools
- **Nodemon** - Development server
- **Git** - Version control

## 📁 Project Structure

```
SignLearn/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── bookingController.js  # Booking management
│   └── progressController.js # Progress tracking
├── models/
│   ├── User.js              # User data model
│   ├── Booking.js           # Booking data model
│   └── Progress.js          # Progress data model
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   ├── bookingRoutes.js     # Booking routes
│   └── progressRoutes.js    # Progress routes
├── views/
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   ├── dashboard.html       # User dashboard
│   ├── course1.html         # Basic signs course
│   ├── course2.html         # Intermediate course
│   └── book.html            # Booking page
├── public/
│   ├── css/
│   │   └── style.css        # Custom styles
│   ├── js/
│   │   ├── main.js          # Main JavaScript
│   │   ├── dashboard.js     # Dashboard functionality
│   │   └── course2.js       # Course 2 functionality
│   └── images/
│       └── *.png            # Sign language images
├── server.js                # Main server file
├── package.json             # Dependencies
└── README.md               # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SignLearn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/signlearn
   SESSION_SECRET=your-secret-key
   ```

4. **Start MongoDB**
   ```bash
   # For local MongoDB
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3001`

## 🔧 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /logout` - User logout

### Progress Routes (`/api/progress`)
- `GET /` - Get user progress
- `POST /` - Update progress
- `DELETE /reset/:courseId` - Reset course progress
- `GET /stats/:courseId` - Get course statistics

### Booking Routes (`/api/booking`)
- `POST /create` - Create new booking
- `GET /` - Get user bookings
- `PUT /:bookingId` - Update booking
- `DELETE /:bookingId` - Cancel booking

## 🎨 User Interface

### Design Principles
- **Material Design** - Clean, modern interface
- **Responsive Layout** - Works on all devices
- **Accessibility** - Inclusive design for all users
- **Intuitive Navigation** - Easy-to-use interface

### Key Pages
1. **Login/Register** - Clean authentication forms
2. **Dashboard** - Personal learning overview
3. **Courses** - Interactive learning modules
4. **Booking** - Tutor session scheduling

## 📊 Database Schema

### User Model
```javascript
{
  email: String (required, unique),
  password: String (required, hashed)
}
```

### Progress Model
```javascript
{
  userId: ObjectId (ref: User),
  courseId: String,
  lessonId: String,
  completed: Boolean,
  score: Number,
  timestamps: true
}
```

### Booking Model
```javascript
{
  userId: ObjectId (ref: User),
  tutor: String,
  sessionType: String,
  date: Date,
  time: String,
  specialRequests: String,
  status: String (enum: pending, confirmed, cancelled, completed),
  notes: String,
  timestamps: true
}
```

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **Session Management** - Secure session handling
- **Input Validation** - Server-side validation
- **Protected Routes** - Authentication middleware
- **CORS Protection** - Cross-origin request handling

## 📱 Mobile Responsiveness

- **Mobile-First Design** - Optimized for mobile devices
- **Touch-Friendly** - Easy interaction on touchscreens
- **Responsive Images** - Adaptive image sizing
- **Flexible Layouts** - Grid and flexbox layouts

## 🧪 Testing

### Manual Testing
1. **User Registration** - Test account creation
2. **User Login** - Test authentication
3. **Course Navigation** - Test course access
4. **Progress Tracking** - Test progress updates
5. **Quiz Functionality** - Test interactive quizzes
6. **Booking System** - Test session booking

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Production Setup
1. **Environment Configuration**
   - Set production environment variables
   - Configure MongoDB Atlas or production database
   - Set up proper session secrets

2. **Server Configuration**
   - Use PM2 for process management
   - Set up reverse proxy (Nginx)
   - Configure SSL certificates

3. **Database Setup**
   - MongoDB Atlas for cloud database
   - Backup and recovery procedures
   - Performance monitoring

## 📈 Future Enhancements

### Planned Features
- **Video Integration** - Video-based learning
- **AI-Powered Feedback** - Automated sign recognition
- **Social Learning** - Community features
- **Mobile App** - Native mobile application
- **Advanced Analytics** - Detailed learning insights
- **Multi-language Support** - Multiple sign languages

### Technical Improvements
- **API Documentation** - Swagger/OpenAPI
- **Unit Testing** - Jest test suite
- **CI/CD Pipeline** - Automated deployment
- **Performance Optimization** - Caching and CDN
- **Security Hardening** - Additional security measures

## 👥 Team

- **Frontend Development** - User interface and experience
- **Backend Development** - Server logic and API
- **Database Design** - Data modeling and optimization
- **UI/UX Design** - User experience and accessibility

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions:
- Email: support@signlearn.com
- Documentation: [Project Wiki]
- Issues: [GitHub Issues]

## 🙏 Acknowledgments

- Materialize CSS for the UI framework
- MongoDB for the database solution
- Express.js community for the web framework
- Sign language educators for content guidance

---

**SignLearn** - Making sign language learning accessible to everyone! 🤟