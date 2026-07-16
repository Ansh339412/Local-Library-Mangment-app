import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,  TextInput,  StyleSheet,  Dimensions,  ScrollView,  FlatList,  Image,  Modal,TouchableWithoutFeedback,Keyboard,Platform} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp, ZoomIn, SlideInDown, SlideOutUp, FadeIn,FadeOut,Layout,LightSpeedInLeft,FlipInXUp, BounceIn,StretchInX,StretchOut,BounceInDown,PinwheelIn} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

// Predefined categories
const INITIAL_CATEGORIES = [
  { id: '1', name: 'Fiction', icon: 'menu-book', color: '#FF6B6B' },
  { id: '2', name: 'Science', icon: 'science', color: '#4ECDC4' },
  { id: '3', name: 'History', icon: 'history-edu', color: '#FFD166' },
  { id: '4', name: 'Art', icon: 'palette', color: '#6A0572' },
  { id: '5', name: 'Academic', icon: 'school', color: '#1A936F' },
  { id: '6', name: 'Biography', icon: 'person', color: '#114B5F' },
];

// Mock books
const INITIAL_BOOKS = [
  { 
    id: '1', 
    title: 'The Silent Patient', 
    author: 'Alex Michaelides', 
    category: 'Fiction', 
    status: 'Available',
    cover: 'https://books.google.co.in/books/publisher/content?id=a6NnDwAAQBAJ&pg=PA1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U0sd_ARiItXsE4NzgkoT7C5xKacag&w=1280',
    isFavorite: false
  },
  { 
    id: '2', 
    title: 'Sapiens: A Brief History', 
    author: 'Yuval Noah Harari', 
    category: 'History', 
    status: 'Borrowed',
    cover: 'https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg',
    isFavorite: true
  },
  { 
    id: '3', 
    title: 'Atomic Habits', 
    author: 'James Clear', 
    category: 'Self-Help', 
    status: 'Available',
    cover: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg',
    isFavorite: false
  },
];

const USERS = [
  { id: '1', name: 'John Smith', role: 'Student', books: 3 },
  { id: '2', name: 'Emma Johnson', role: 'Teacher', books: 5 },
  { id: '3', name: 'Michael Brown', role: 'Researcher', books: 12 },
];

// Mock user profile data
const MOCK_PROFILE = {
  name: "Anshpreet Singh",
  email: "hakikatsingh099@gmail.com",
  role: "Student",
  institute: "University of Technology",
  address: "New Delhi, India",
  booksIssued: 3,
  booksReturned: 4,
  avatar: null
};

const AuthScreen = ({ isLoginMode, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(isLoginMode);
  const [form, setForm] = useState({
    name: '',
    school: '',
    address: '',
    username: '',
    password: '',
  });

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  return (
    <Animated.View 
      entering={FadeInUp.duration(500)} 
      style={styles.authContainer}
    >
      <ScrollView 
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeIn.delay(100)}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="arrow-back" size={24} color="#555" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.Text 
          entering={FadeInDown.delay(200)}
          style={styles.authTitle}
        >
          {isLogin ? 'Login to Your Account' : 'Create New Account'}
        </Animated.Text>

        {!isLogin && (
          <>
            <Animated.View entering={FadeInDown.delay(300)}>
              <View style={styles.inputContainer}>
                <Icon name="person" size={20} color="#777" style={styles.inputIcon} />
                <TextInput 
                  placeholder="Full Name" 
                  style={styles.input} 
                  onChangeText={(text) => handleChange('name', text)} 
                  value={form.name} 
                />
              </View>
            </Animated.View>
            
            <Animated.View entering={FadeInDown.delay(350)}>
              <View style={styles.inputContainer}>
                <Icon name="school" size={20} color="#777" style={styles.inputIcon} />
                <TextInput 
                  placeholder="School Name" 
                  style={styles.input} 
                  onChangeText={(text) => handleChange('school', text)} 
                  value={form.school} 
                />
              </View>
            </Animated.View>
            
            <Animated.View entering={FadeInDown.delay(400)}>
              <View style={styles.inputContainer}>
                <Icon name="location-on" size={20} color="#777" style={styles.inputIcon} />
                <TextInput 
                  placeholder="Address" 
                  style={styles.input} 
                  onChangeText={(text) => handleChange('address', text)} 
                  value={form.address} 
                />
              </View>
            </Animated.View>
          </>
        )}

        <Animated.View entering={FadeInDown.delay(450)}>
          <View style={styles.inputContainer}>
            <Icon name="person-outline" size={20} color="#777" style={styles.inputIcon} />
            <TextInput 
              placeholder="Username" 
              style={styles.input} 
              onChangeText={(text) => handleChange('username', text)} 
              value={form.username} 
            />
          </View>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.delay(500)}>
          <View style={styles.inputContainer}>
            <Icon name="lock-outline" size={20} color="#777" style={styles.inputIcon} />
            <TextInput 
              placeholder="Password" 
              style={styles.input} 
              secureTextEntry 
              onChangeText={(text) => handleChange('password', text)} 
              value={form.password} 
            />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(550)}>
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={() => {
              if (form.username && form.password) {
                onLoginSuccess();
              }
            }}
          >
            <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Create Account'}</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600)}>
          <TouchableOpacity 
            onPress={() => setIsLogin(!isLogin)} 
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Text style={styles.toggleHighlight}>
                {isLogin ? 'Sign Up' : 'Login'}
              </Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </Animated.View>
  );
};

const HeroScreen = ({ onLoginPress, onSignUpPress }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
      <Animated.Image 
        entering={ZoomIn.duration(1000)} 
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/29/29302.png' }} 
        style={styles.logo} 
      />
      <Animated.Text 
        entering={FadeInDown.delay(100).duration(800)} 
        style={styles.title}
      >
        Library Management
      </Animated.Text>
      <Animated.Text 
        entering={FadeInDown.delay(200).duration(800)} 
        style={styles.subtitle}
      >
        Organize | Read | Manage
      </Animated.Text>
    </View>

    <Animated.View 
      entering={FadeInDown.delay(400).duration(1000)} 
      style={styles.buttonGroup}
    >
      <TouchableOpacity 
        style={[styles.button, styles.buttonPrimary]} 
        onPress={onLoginPress}
      >
        <Animated.Text 
          entering={FadeIn.delay(500)}
          style={styles.buttonText}
        >
          Login
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, styles.buttonSecondary]} 
        onPress={onSignUpPress}
      >
        <Animated.Text 
          entering={FadeIn.delay(600)}
          style={styles.buttonText}
        >
          Sign Up
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>

    <Animated.Text 
      entering={FadeInDown.delay(600).duration(1000)} 
      style={styles.footer}
    >
      © 2025 Central Library Management System
    </Animated.Text>
  </SafeAreaView>
);

const ProfileScreen = ({ user, onLogout, navigation }) => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [profileData, setProfileData] = useState(user);
  const [tempProfile, setTempProfile] = useState(user);
  
  const pickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setTempProfile({...tempProfile, avatar: result.assets[0].uri});
    }
  };

  const handleSaveProfile = () => {
    setProfileData(tempProfile);
    setEditModalVisible(false);
  };

  const handleFavoritesPress = () => {
    navigation.navigate('Favorites');
  };

  return (
    <ScrollView style={styles.profileContainer}>
      <Animated.View 
        entering={FadeInDown.duration(500)}
        layout={Layout.duration(300)}
        style={styles.profileHeader}
      >
        <TouchableOpacity onPress={pickAvatar} style={styles.avatarContainer}>
          {tempProfile.avatar ? (
            <Animated.Image 
              entering={BounceIn.duration(500)}
              source={{ uri: tempProfile.avatar }} 
              style={styles.avatar} 
            />
          ) : (
            <Animated.View 
              entering={FlipInXUp.duration(600)}
              style={styles.avatarPlaceholder}
            >
              <Icon name="person" size={60} color="#5E72E4" />
            </Animated.View>
          )}
          <View style={styles.editAvatarIcon}>
            <Icon name="edit" size={18} color="#fff" />
          </View>
        </TouchableOpacity>

        <Animated.Text 
          entering={LightSpeedInLeft.delay(200)}
          style={styles.profileName}
        >
          {profileData.name}
        </Animated.Text>
        <Animated.Text 
          entering={LightSpeedInLeft.delay(300)}
          style={styles.profileRole}
        >
          {profileData.role}
        </Animated.Text>
      </Animated.View>

      <Animated.View 
        entering={FadeInDown.delay(400)}
        style={styles.profileCard}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Personal Information</Text>
          <TouchableOpacity onPress={() => setEditModalVisible(true)}>
            <Icon name="edit" size={24} color="#5E72E4" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoRow}>
          <Icon name="email" size={20} color="#8898AA" />
          <Text style={styles.infoText}>{profileData.email}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Icon name="school" size={20} color="#8898AA" />
          <Text style={styles.infoText}>{profileData.institute}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Icon name="location-on" size={20} color="#8898AA" />
          <Text style={styles.infoText}>{profileData.address}</Text>
        </View>
      </Animated.View>

      <Animated.View 
        entering={FadeInDown.delay(500)}
        style={styles.statsContainer}
      >
        <View style={styles.statCard}>
          <Icon name="menu-book" size={30} color="#5E72E4" />
          <Text style={styles.statNumber}>{profileData.booksIssued}</Text>
          <Text style={styles.statLabel}>Books Issued</Text>
        </View>
        
        <View style={styles.statCard}>
          <Icon name="check-circle" size={30} color="#2DCE89" />
          <Text style={styles.statNumber}>{profileData.booksReturned}</Text>
          <Text style={styles.statLabel}>Books Returned</Text>
        </View>
      </Animated.View>

      <Animated.View 
        entering={FadeInDown.delay(600)}
        style={styles.actionButtons}
      >
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Feedback')}
        >
          <Icon name="feedback" size={24} color="#5E72E4" />
          <Text style={styles.actionButtonText}>Give Feedback</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {}}
        >
          <Icon name="history" size={24} color="#5E72E4" />
          <Text style={styles.actionButtonText}>Borrowing History</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleFavoritesPress}
        >
          <Icon name="favorite" size={24} color="#5E72E4" />
          <Text style={styles.actionButtonText}>My Favorites</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={onLogout}
        >
          <Icon name="logout" size={24} color="#FB6340" />
          <Text style={[styles.actionButtonText, { color: '#FB6340' }]}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <Animated.View 
                entering={SlideInDown.duration(300)}
                exiting={SlideOutUp.duration(300)}
                style={styles.modalContent}
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Edit Profile</Text>
                  <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                    <Icon name="close" size={24} color="#8898AA" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.modalBody}>
                  <TouchableOpacity onPress={pickAvatar} style={styles.avatarEditContainer}>
                    {tempProfile.avatar ? (
                      <Image source={{ uri: tempProfile.avatar }} style={styles.avatarEdit} />
                    ) : (
                      <View style={styles.avatarEditPlaceholder}>
                        <Icon name="add-a-photo" size={40} color="#5E72E4" />
                        <Text style={styles.coverText}>Add Profile Photo</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  
                  <View style={styles.modalInputContainer}>
                    <Text style={styles.modalLabel}>Full Name</Text>
                    <TextInput 
                      style={styles.modalInput}
                      placeholder="Enter your name"
                      value={tempProfile.name}
                      onChangeText={text => setTempProfile({...tempProfile, name: text})}
                    />
                  </View>
                  
                  <View style={styles.modalInputContainer}>
                    <Text style={styles.modalLabel}>Email</Text>
                    <TextInput 
                      style={styles.modalInput}
                      placeholder="Enter your email"
                      value={tempProfile.email}
                      onChangeText={text => setTempProfile({...tempProfile, email: text})}
                      keyboardType="email-address"
                    />
                  </View>
                  
                  <View style={styles.modalInputContainer}>
                    <Text style={styles.modalLabel}>Institute</Text>
                    <TextInput 
                      style={styles.modalInput}
                      placeholder="Enter your institute"
                      value={tempProfile.institute}
                      onChangeText={text => setTempProfile({...tempProfile, institute: text})}
                    />
                  </View>
                  
                  <View style={styles.modalInputContainer}>
                    <Text style={styles.modalLabel}>Address</Text>
                    <TextInput 
                      style={styles.modalInput}
                      placeholder="Enter your address"
                      value={tempProfile.address}
                      onChangeText={text => setTempProfile({...tempProfile, address: text})}
                    />
                  </View>
                </View>
                
                <View style={styles.modalFooter}>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => setEditModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.addBookButton}
                    onPress={handleSaveProfile}
                  >
                    <Text style={styles.addBookButtonText}>Save Changes</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

const FeedbackScreen = ({ navigation }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFeedback("");
      setRating(0);
      navigation.goBack();
    }, 2000);
  };
  
  const renderStars = () => {
    return Array(5).fill(0).map((_, index) => (
      <TouchableOpacity 
        key={index} 
        onPress={() => setRating(index + 1)}
        style={styles.starButton}
      >
        <Animated.View entering={BounceInDown.delay(index * 100)}>
          <Icon 
            name={index < rating ? "star" : "star-border"} 
            size={36} 
            color="#FFD700" 
          />
        </Animated.View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.feedbackContainer}>
      <Animated.View 
        entering={FadeInDown.duration(500)}
        style={styles.feedbackHeader}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#5E72E4" />
        </TouchableOpacity>
        <Text style={styles.feedbackTitle}>Share Your Feedback</Text>
      </Animated.View>
      
      {isSubmitted ? (
        <Animated.View 
          entering={PinwheelIn.duration(800)}
          style={styles.successContainer}
        >
          <Icon name="check-circle" size={80} color="#2DCE89" />
          <Text style={styles.successText}>Thank You!</Text>
          <Text style={styles.successSubtext}>Your feedback has been submitted</Text>
        </Animated.View>
      ) : (
        <ScrollView style={styles.feedbackContent}>
          <Animated.View 
            entering={FadeInDown.delay(200)}
            style={styles.ratingContainer}
          >
            <Text style={styles.ratingTitle}>How would you rate our app?</Text>
            <View style={styles.starsContainer}>
              {renderStars()}
            </View>
          </Animated.View>
          
          <Animated.View 
            entering={FadeInDown.delay(300)}
            style={styles.feedbackInputContainer}
          >
            <Text style={styles.inputLabel}>Your Feedback</Text>
            <TextInput
              style={styles.feedbackInput}
              placeholder="What do you like about our app? How can we improve?"
              multiline
              numberOfLines={6}
              value={feedback}
              onChangeText={setFeedback}
            />
          </Animated.View>
          
          <Animated.View 
            entering={FadeInDown.delay(400)}
            style={styles.suggestionContainer}
          >
            <Text style={styles.suggestionTitle}>What would you like to see in future updates?</Text>
            <View style={styles.suggestionOptions}>
              <TouchableOpacity style={styles.suggestionOption}>
                <Text style={styles.suggestionText}>More book categories</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.suggestionOption}>
                <Text style={styles.suggestionText}>Offline reading</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.suggestionOption}>
                <Text style={styles.suggestionText}>Audio books</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.suggestionOption}>
                <Text style={styles.suggestionText}>Book recommendations</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          
          <Animated.View 
            entering={FadeInDown.delay(500)}
            style={styles.submitButtonContainer}
          >
            <TouchableOpacity 
              style={[styles.submitButton, !rating && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={!rating}
            >
              <Text style={styles.submitButtonText}>Submit Feedback</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      )}
    </View>
  );
};

const FavoritesScreen = ({ books, navigation }) => {
  const favoriteBooks = books.filter(book => book.isFavorite);

  return (
    <View style={styles.tabContent}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search favorite books..." 
            style={styles.searchInput}
          />
        </View>
      </View>
      
      <FlatList
        data={favoriteBooks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookListItem}>
            <Image source={{ uri: item.cover }} style={styles.listBookCover} />
            <View style={styles.bookInfo}>
              <Text style={styles.listBookTitle}>{item.title}</Text>
              <Text style={styles.listBookAuthor}>{item.author}</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.listBookCategory}>{item.category}</Text>
              </View>
            </View>
            <View style={[
              styles.listStatusBadge, 
              { backgroundColor: item.status === 'Available' ? '#2DCE89' : '#FB6340' }
            ]}>
              <Text style={styles.listStatusText}>{item.status}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.bookListContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="favorite-border" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No favorite books yet</Text>
          </View>
        }
      />
    </View>
  );
};

const MainScreen = ({ onLogout, navigation }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddBookModalVisible, setAddBookModalVisible] = useState(false);
  const [isAddCategoryModalVisible, setAddCategoryModalVisible] = useState(false);
  const [isCategorySelectionModalVisible, setIsCategorySelectionModalVisible] = useState(false);
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [newBook, setNewBook] = useState({ 
    title: '', 
    author: '', 
    category: '',
    status: 'Available',
    cover: null,
    isFavorite: false
  });
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [user, setUser] = useState(MOCK_PROFILE);
  
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || book.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddBook = () => {
    if (newBook.title && newBook.author && newBook.category) {
      const newBookWithId = {
        ...newBook,
        id: (books.length + 1).toString(),
        cover: newBook.cover || 'https://via.placeholder.com/150x200.png?text=No+Cover'
      };
      
      setBooks([newBookWithId, ...books]);
      setAddBookModalVisible(false);
      setNewBook({ 
        title: '', 
        author: '', 
        category: '',
        status: 'Available',
        cover: null,
        isFavorite: false
      });
    }
  };

  const handleAddCategory = () => {
    if (newCategory.name) {
      const newCategoryWithId = {
        ...newCategory,
        id: (categories.length + 1).toString(),
        icon: 'bookmark',
        color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
      };
      
      setCategories([...categories, newCategoryWithId]);
      setAddCategoryModalVisible(false);
      setNewCategory({ name: '' });
    }
  };

  const handleCategoryFilter = (categoryName) => {
    if (categoryFilter === categoryName) {
      setCategoryFilter(null);
    } else {
      setCategoryFilter(categoryName);
    }
  };

  const toggleBookStatus = (bookId) => {
    setBooks(books.map(book => 
      book.id === bookId 
        ? { ...book, status: book.status === 'Available' ? 'Borrowed' : 'Available' } 
        : book
    ));
  };

  const toggleFavorite = (bookId) => {
    setBooks(books.map(book => 
      book.id === bookId 
        ? { ...book, isFavorite: !book.isFavorite } 
        : book
    ));
  };

  const deleteBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setNewBook({...newBook, cover: result.assets[0].uri});
    }
  };

  const renderDashboard = () => (
    <View style={styles.dashboardContainer}>
      <Animated.View 
        entering={FadeInDown.duration(500)}
        layout={Layout.duration(300)}
        style={styles.statsContainer}
      >
        <Animated.View 
          entering={FlipInXUp.duration(600)}
          style={[styles.statCard, { backgroundColor: '#5E72E4' }]}
        >
          <Icon name="book" size={30} color="#fff" />
          <Text style={styles.statNumber}>{books.length}</Text>
          <Text style={styles.statLabel}>Total Books</Text>
        </Animated.View>
        <Animated.View 
          entering={FlipInXUp.delay(100).duration(600)}
          style={[styles.statCard, { backgroundColor: '#2DCE89' }]}
        >
          <Icon name="people" size={30} color="#fff" />
          <Text style={styles.statNumber}>{USERS.length}</Text>
          <Text style={styles.statLabel}>Active Users</Text>
        </Animated.View>
      </Animated.View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <Animated.View 
            entering={LightSpeedInLeft.delay(100 + (index * 50))}
            layout={Layout.duration(300)}
          >
            <TouchableOpacity 
              style={styles.categoryCard} 
              onPress={() => handleCategoryFilter(item.name)}
            >
              <View style={[
                styles.categoryIcon, 
                { 
                  backgroundColor: item.color,
                  borderColor: categoryFilter === item.name ? '#5E72E4' : 'transparent',
                  borderWidth: categoryFilter === item.name ? 3 : 0
                }
              ]}>
                <Icon name={item.icon} size={28} color="#fff" />
              </View>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        contentContainerStyle={styles.categoryList}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {categoryFilter ? `${categoryFilter} Books` : 'Recently Added'}
        </Text>
        <TouchableOpacity onPress={() => setActiveTab('books')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categoryFilter 
          ? books.filter(book => book.category === categoryFilter).slice(0, 3)
          : books.slice(0, 3)}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <Animated.View 
            entering={LightSpeedInLeft.delay(200 + (index * 100))}
            layout={Layout.duration(300)}
          >
            <View style={styles.bookCard}>
              <Image source={{ uri: item.cover }} style={styles.bookCover} />
              <Text style={styles.bookTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.bookAuthor}>{item.author}</Text>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: item.status === 'Available' ? '#2DCE89' : '#FB6340' }
              ]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          </Animated.View>
        )}
        contentContainerStyle={styles.bookList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="book" size={40} color="#ccc" />
            <Text style={styles.emptyText}>No books found</Text>
          </View>
        }
      />
    </View>
  );

  const renderBooks = () => (
    <View style={styles.tabContent}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search books..." 
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.bookActionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.addCategoryButton]}
            onPress={() => setAddCategoryModalVisible(true)}
          >
            <Icon name="bookmark-add" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.addBookButton]}
            onPress={() => setAddBookModalVisible(true)}
          >
            <Icon name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={filteredBooks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookListItem}>
            <Image source={{ uri: item.cover }} style={styles.listBookCover} />
            <View style={styles.bookInfo}>
              <Text style={styles.listBookTitle}>{item.title}</Text>
              <Text style={styles.listBookAuthor}>{item.author}</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.listBookCategory}>{item.category}</Text>
              </View>
            </View>
            <View style={styles.bookActions}>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Icon 
                  name={item.isFavorite ? "favorite" : "favorite-border"} 
                  size={24} 
                  color={item.isFavorite ? "#FB6340" : "#8898AA"} 
                />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => toggleBookStatus(item.id)}
                style={[
                  styles.listStatusBadge, 
                  { backgroundColor: item.status === 'Available' ? '#2DCE89' : '#FB6340' }
                ]}
              >
                <Text style={styles.listStatusText}>{item.status}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteBook(item.id)}>
                <Icon name="delete" size={24} color="#FB6340" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.bookListContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="search-off" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No books found</Text>
          </View>
        }
      />
    </View>
  );

  const renderUsers = () => (
    <View style={styles.tabContent}>
      <FlatList
        data={USERS}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <Animated.View 
            entering={FadeInDown.delay(index * 50).duration(500)}
            layout={Layout.duration(300)}
          >
            <View style={styles.userCard}>
              <View style={styles.userAvatar}>
                <Icon name="person" size={28} color="#fff" />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userRole}>{item.role}</Text>
              </View>
              <View style={styles.userBooks}>
                <Icon name="menu-book" size={18} color="#5E72E4" />
                <Text style={styles.userBooksText}>{item.books} books</Text>
              </View>
            </View>
          </Animated.View>
        )}
        contentContainerStyle={styles.userList}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Animated.View 
        entering={FadeInDown.duration(500)}
        style={styles.homeHeader}
      >
        <TouchableOpacity onPress={() => setActiveTab('profile')} style={styles.profileHeaderButton}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.headerAvatar} />
          ) : (
            <View style={styles.headerAvatarPlaceholder}>
              <Icon name="person" size={24} color="#5E72E4" />
            </View>
          )}
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('profile')}>
          <Icon name="notifications" size={24} color="#5E72E4" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View 
        entering={FadeInDown.delay(100).duration(500)}
        style={styles.tabContainer}
      >
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'dashboard' && styles.activeTab]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Icon 
            name="dashboard" 
            size={20} 
            color={activeTab === 'dashboard' ? '#5E72E4' : '#8898AA'} 
          />
          <Text style={[
            styles.tabText, 
            activeTab === 'dashboard' && styles.activeTabText
          ]}>
            Dashboard
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'books' && styles.activeTab]}
          onPress={() => setActiveTab('books')}
        >
          <Icon 
            name="menu-book" 
            size={20} 
            color={activeTab === 'books' ? '#5E72E4' : '#8898AA'} 
          />
          <Text style={[
            styles.tabText, 
            activeTab === 'books' && styles.activeTabText
          ]}>
            Books
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'users' && styles.activeTab]}
          onPress={() => setActiveTab('users')}
        >
          <Icon 
            name="people" 
            size={20} 
            color={activeTab === 'users' ? '#5E72E4' : '#8898AA'} 
          />
          <Text style={[
            styles.tabText, 
            activeTab === 'users' && styles.activeTabText
          ]}>
            Users
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
          onPress={() => setActiveTab('profile')}
        >
          <Icon 
            name="person" 
            size={20} 
            color={activeTab === 'profile' ? '#5E72E4' : '#8898AA'} 
          />
          <Text style={[
            styles.tabText, 
            activeTab === 'profile' && styles.activeTabText
          ]}>
            Profile
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.contentContainer}>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'books' && renderBooks()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'profile' && <ProfileScreen user={user} onLogout={onLogout} navigation={navigation} />}
      </ScrollView>

      {/* Add Book Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddBookModalVisible}
        onRequestClose={() => setAddBookModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <Animated.View 
                entering={SlideInDown.duration(300)}
                exiting={SlideOutUp.duration(300)}
                style={styles.modalContent}
              >
                <View style={styles.modalHeader}>
                  <Animated.Text 
                    entering={FadeIn.delay(100)}
                    style={styles.modalTitle}
                  >
                    Add New Book
                  </Animated.Text>
                  <TouchableOpacity onPress={() => setAddBookModalVisible(false)}>
                    <Icon name="close" size={24} color="#8898AA" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.modalBody}>
                  <Animated.View entering={FadeInDown.delay(200)}>
                    <TouchableOpacity onPress={pickImage} style={styles.coverImageContainer}>
                      {newBook.cover ? (
                        <Image source={{ uri: newBook.cover }} style={styles.coverImage} />
                      ) : (
                        <View style={styles.coverPlaceholder}>
                          <Icon name="add-a-photo" size={40} color="#5E72E4" />
                          <Text style={styles.coverText}>Add Book Cover</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                  
                  <Animated.View entering={FadeInDown.delay(250)}>
                    <View style={styles.modalInputContainer}>
                      <Text style={styles.modalLabel}>Book Title *</Text>
                      <TextInput 
                        style={styles.modalInput}
                        placeholder="Enter book title"
                        value={newBook.title}
                        onChangeText={text => setNewBook({...newBook, title: text})}
                      />
                    </View>
                  </Animated.View>
                  
                  <Animated.View entering={FadeInDown.delay(300)}>
                    <View style={styles.modalInputContainer}>
                      <Text style={styles.modalLabel}>Author *</Text>
                      <TextInput 
                        style={styles.modalInput}
                        placeholder="Enter author name"
                        value={newBook.author}
                        onChangeText={text => setNewBook({...newBook, author: text})}
                      />
                    </View>
                  </Animated.View>
                  
                  <Animated.View entering={FadeInDown.delay(350)}>
                    <View style={styles.modalInputContainer}>
                      <Text style={styles.modalLabel}>Category *</Text>
                      <TouchableOpacity 
                        style={styles.categorySelector}
                        onPress={() => setIsCategorySelectionModalVisible(true)}
                      >
                        <Text style={newBook.category 
                          ? styles.categorySelectorText 
                          : styles.categorySelectorPlaceholder
                        }>
                          {newBook.category || 'Select Category'}
                        </Text>
                        <Icon name="arrow-drop-down" size={24} color="#5E72E4" />
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                </View>
                
                <View style={styles.modalFooter}>
                  <Animated.View entering={FadeInDown.delay(400)}>
                    <TouchableOpacity 
                      style={styles.cancelButton}
                      onPress={() => setAddBookModalVisible(false)}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View entering={FadeInDown.delay(450)}>
                    <TouchableOpacity 
                      style={[styles.addBookButton, (!newBook.title || !newBook.author || !newBook.category) ? styles.disabledButton : null]}
                      onPress={handleAddBook}
                      disabled={!newBook.title || !newBook.author || !newBook.category}
                    >
                      <Text style={styles.addBookButtonText}>Add Book</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Category Selection Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isCategorySelectionModalVisible}
        onRequestClose={() => setIsCategorySelectionModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => setIsCategorySelectionModalVisible(false)}>
            <View style={styles.modalBackdrop} />
          </TouchableWithoutFeedback>
          
          <Animated.View 
            entering={FadeInDown.duration(300)}
            style={styles.categoryModalContent}
          >
            <Text style={styles.modalTitle}>Select Category</Text>
            <FlatList
              data={categories}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryOption}
                  onPress={() => {
                    setNewBook({...newBook, category: item.name});
                    setIsCategorySelectionModalVisible(false);
                  }}
                >
                  <View style={[styles.categoryColor, { backgroundColor: item.color }]} />
                  <Text style={styles.categoryOptionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.categoryListContainer}
            />
          </Animated.View>
        </View>
      </Modal>

      {/* Add Category Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddCategoryModalVisible}
        onRequestClose={() => setAddCategoryModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <Animated.View 
                entering={SlideInDown.duration(300)}
                exiting={SlideOutUp.duration(300)}
                style={styles.modalContent}
              >
                <View style={styles.modalHeader}>
                  <Animated.Text 
                    entering={FadeIn.delay(100)}
                    style={styles.modalTitle}
                  >
                    Add New Category
                  </Animated.Text>
                  <TouchableOpacity onPress={() => setAddCategoryModalVisible(false)}>
                    <Icon name="close" size={24} color="#8898AA" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.modalBody}>
                  <Animated.View entering={FadeInDown.delay(200)}>
                    <View style={styles.modalInputContainer}>
                      <Text style={styles.modalLabel}>Category Name *</Text>
                      <TextInput 
                        style={styles.modalInput}
                        placeholder="Enter category name"
                        value={newCategory.name}
                        onChangeText={text => setNewCategory({...newCategory, name: text})}
                      />
                    </View>
                  </Animated.View>
                </View>
                
                <View style={styles.modalFooter}>
                  <Animated.View entering={FadeInDown.delay(250)}>
                    <TouchableOpacity 
                      style={styles.cancelButton}
                      onPress={() => setAddCategoryModalVisible(false)}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View entering={FadeInDown.delay(300)}>
                    <TouchableOpacity 
                      style={[styles.addBookButton, !newCategory.name ? styles.disabledButton : null]}
                      onPress={handleAddCategory}
                      disabled={!newCategory.name}
                    >
                      <Text style={styles.addBookButtonText}>Add Category</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const App = () => {
  const [authMode, setAuthMode] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState('main');
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [user, setUser] = useState(MOCK_PROFILE);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActiveScreen('main');
  };

  return (
    <SafeAreaProvider>
      {isLoggedIn ? (
        activeScreen === 'feedback' ? (
          <FeedbackScreen navigation={{ goBack: () => setActiveScreen('main') }} />
        ) : activeScreen === 'favorites' ? (
          <FavoritesScreen books={books} navigation={{ goBack: () => setActiveScreen('main') }} />
        ) : (
          <MainScreen 
            onLogout={() => {
              setIsLoggedIn(false);
              setAuthMode(null);
            }} 
            navigation={{ 
              navigate: (screen) => setActiveScreen(screen),
              goBack: () => setActiveScreen('main')
            }}
          />
        )
      ) : authMode ? (
        <AuthScreen 
          isLoginMode={authMode === 'login'} 
          onClose={() => setAuthMode(null)} 
          onLoginSuccess={handleLoginSuccess} 
        />
      ) : (
        <HeroScreen 
          onLoginPress={() => setAuthMode('login')} 
          onSignUpPress={() => setAuthMode('signup')} 
        />
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  // ... (keep all existing styles the same)
    container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#32325D',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#525F7F',
    marginTop: 8,
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  buttonGroup: {
    width: width * 0.85,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonPrimary: {
    backgroundColor: '#5E72E4',
  },
  buttonSecondary: {
    backgroundColor: '#2DCE89',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    fontSize: 14,
    color: '#8898AA',
    marginBottom: 20,
  },
  
  // Auth Screen Styles
  authContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  formContainer: {
    padding: 25,
    paddingTop: 60,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 25,
    zIndex: 10,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#32325D',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#32325D',
  },
  submitButton: {
    backgroundColor: '#5E72E4',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#5E72E4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  toggleButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  toggleText: {
    color: '#525F7F',
    fontSize: 15,
  },
  toggleHighlight: {
    color: '#5E72E4',
    fontWeight: '600',
  },
  
  // Home Screen Styles
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  profileHeaderButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  headerAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  welcomeText: {
    fontSize: 16,
    color: '#8898AA',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#32325D',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    paddingVertical: 10,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
  },
  activeTab: {
    backgroundColor: '#F0F4FF',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#8898AA',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#5E72E4',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  
  // Dashboard Styles
  dashboardContainer: {
    paddingBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    width: width * 0.43,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#32325D',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#8898AA',
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#32325D',
  },
  seeAll: {
    fontSize: 14,
    color: '#5E72E4',
    fontWeight: '600',
  },
  categoryList: {
    paddingBottom: 10,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#525F7F',
  },
  bookList: {
    paddingBottom: 15,
  },
  bookCard: {
    width: 150,
    marginRight: 15,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  bookCover: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#E9ECEF',
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#32325D',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 13,
    color: '#8898AA',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  statusText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: 150,
  },
  emptyText: {
    fontSize: 14,
    color: '#8898AA',
    marginTop: 10,
    textAlign: 'center',
  },
  
  // Books Tab Styles
  tabContent: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#32325D',
  },
  bookActionButtons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addBookButton: {
    backgroundColor: '#5E72E4',
  },
  addCategoryButton: {
    backgroundColor: '#11cdef',
  },
  bookListContainer: {
    paddingBottom: 30,
  },
  bookListItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  listBookCover: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#E9ECEF',
  },
  bookInfo: {
    flex: 1,
  },
  listBookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#32325D',
    marginBottom: 4,
  },
  listBookAuthor: {
    fontSize: 14,
    color: '#8898AA',
    marginBottom: 6,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F4FF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  listBookCategory: {
    fontSize: 12,
    color: '#5E72E4',
    fontWeight: '500',
  },
  listStatusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  listStatusText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '500',
  },
  
  // Users Tab Styles
  userList: {
    paddingBottom: 30,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#5E72E4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#32325D',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#8898AA',
  },
  userBooks: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  userBooksText: {
    fontSize: 12,
    color: '#5E72E4',
    fontWeight: '500',
    marginLeft: 5,
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBackdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 25,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
    maxHeight: height * 0.85,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#32325D',
  },
  modalBody: {
    marginBottom: 25,
  },
  modalInputContainer: {
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 14,
    color: '#525F7F',
    marginBottom: 8,
    fontWeight: '500',
  },
  modalInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#32325D',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#F8F9FA',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8898AA',
  },
  addBookButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#5E72E4',
  },
  disabledButton: {
    backgroundColor: '#CCD1D9',
  },
  addBookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  
  // Profile Screen Styles
  profileContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#5E72E4',
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#5E72E4',
  },
  editAvatarIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#5E72E4',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#32325D',
    marginBottom: 5,
  },
  profileRole: {
    fontSize: 16,
    color: '#8898AA',
  },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#32325D',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#525F7F',
    marginLeft: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    width: width * 0.28,
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtons: {
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#32325D',
    fontWeight: '500',
    marginLeft: 15,
  },
  
  // Edit Profile Modal Styles
  avatarEditContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarEdit: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#5E72E4',
  },
  avatarEditPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#5E72E4',
    borderStyle: 'dashed',
  },
  coverText: {
    color: '#5E72E4',
    marginTop: 10,
    fontWeight: '500',
  },
  
  // Feedback Screen Styles
  feedbackContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  backButton: {
    marginRight: 15,
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#32325D',
  },
  feedbackContent: {
    padding: 20,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#32325D',
    marginBottom: 20,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starButton: {
    marginHorizontal: 5,
  },
  feedbackInputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#32325D',
    marginBottom: 10,
  },
  feedbackInput: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#32325D',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    minHeight: 150,
    textAlignVertical: 'top',
  },
  suggestionContainer: {
    marginBottom: 30,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#32325D',
    marginBottom: 15,
  },
  suggestionOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  suggestionOption: {
    width: width * 0.43,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionText: {
    fontSize: 14,
    color: '#525F7F',
    textAlign: 'center',
  },
  submitButtonContainer: {
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: '#5E72E4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#32325D',
    marginTop: 20,
  },
  successSubtext: {
    fontSize: 18,
    color: '#8898AA',
    marginTop: 10,
  },
  
  
  categoryModalContent: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    maxHeight: height * 0.6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  categoryListContainer: {
    paddingBottom: 10,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  categoryColor: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 15,
  },
  categoryOptionText: {
    fontSize: 16,
    color: '#32325D',
  },
  
  
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  categorySelectorText: {
    fontSize: 16,
    color: '#32325D',
  },
  categorySelectorPlaceholder: {
    fontSize: 16,
    color: '#8898AA',
  },

  coverImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  coverImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
  },
  coverPlaceholder: {
    width: 120,
    height: 160,
    borderRadius: 8,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#5E72E4',
    borderStyle: 'dashed',
  },
  coverText: {
    color: '#5E72E4',
    marginTop: 10,
    fontWeight: '500',
  },
  bookActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default App;