'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  FileText, 
  CheckCircle,
  Award,
  School,
  Shield
} from 'lucide-react';

export default function SchoolRegistrationPage() {
  const [formData, setFormData] = useState({
    // Student Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    
    // Contact Information
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    
    // Parent/Guardian Information
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    parentOccupation: '',
    
    // Academic Information
    previousSchool: '',
    previousClass: '',
    admissionClass: '',
    preferredStream: '',
    subjects: [] as string[],
    
    // Emergency Contact
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelationship: '',
    
    // Medical Information
    medicalConditions: '',
    allergies: '',
    bloodGroup: '',
    
    // Declaration
    agreement: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const academicStreams = [
    'Science',
    'Commerce',
    'Arts/Humanities',
    'Technical/Vocational'
  ];

  const subjectOptions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'English', 'History', 'Geography', 'Economics',
    'Accounting', 'Business Studies', 'Computer Science',
    'Art', 'Music', 'Physical Education', 'Home Science'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox' && 'checked' in e.target) {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'agreement') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else if (name === 'subjects') {
        if (checked) {
          setFormData(prev => ({
            ...prev,
            subjects: [...prev.subjects, value]
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            subjects: prev.subjects.filter(subject => subject !== value)
          }));
        }
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    } else if (step === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.parentName.trim()) newErrors.parentName = 'Parent/Guardian name is required';
    } else if (step === 3) {
      if (!formData.admissionClass) newErrors.admissionClass = 'Admission class is required';
      if (!formData.preferredStream) newErrors.preferredStream = 'Preferred stream is required';
      if (formData.subjects.length < 3) newErrors.subjects = 'Select at least 3 subjects';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep(4) && formData.agreement) {
      // In a real application, you would send data to a server here
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setCurrentStep(1);
        setFormData({
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          gender: '',
          nationality: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          parentName: '',
          parentPhone: '',
          parentEmail: '',
          parentOccupation: '',
          previousSchool: '',
          previousClass: '',
          admissionClass: '',
          preferredStream: '',
          subjects: [],
          emergencyName: '',
          emergencyPhone: '',
          emergencyRelationship: '',
          medicalConditions: '',
          allergies: '',
          bloodGroup: '',
          agreement: false
        });
      }, 5000);
    } else if (!formData.agreement) {
      setErrors(prev => ({ ...prev, agreement: 'You must agree to the terms' }));
    }
  };

  const stepTitles = [
    'Student Information',
    'Contact & Guardian Details',
    'Academic Preferences',
    'Medical & Emergency Info'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <School className="text-white" size={36} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Jarso Senior Secondary School
              </h1>
              <p className="text-gray-600 mt-1">Academic Year 2024-2025 Registration</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="flex items-center gap-2 text-blue-700">
              <Shield className="text-blue-600" />
              <span className="font-semibold">Secure Registration</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Admissions Open Until Dec 31, 2024</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {stepTitles.map((title, index) => (
              <div key={index} className="text-center flex-1">
                <div className={`flex items-center justify-center mx-auto mb-2 w-10 h-10 rounded-full border-2 ${
                  currentStep > index + 1
                    ? 'bg-green-500 border-green-500 text-white'
                    : currentStep === index + 1
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {currentStep > index + 1 ? <CheckCircle size={20} /> : index + 1}
                </div>
                <span className={`text-sm font-medium ${
                  currentStep >= index + 1 ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {title}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {isSubmitted ? (
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-green-200 text-center">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Registration Successful! 🎉
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Thank you, <span className="font-semibold text-blue-600">{formData.firstName} {formData.lastName}</span>. 
              Your application has been submitted successfully.
            </p>
            <div className="bg-blue-50 rounded-xl p-6 inline-block">
              <p className="text-gray-700">
                Application ID: <span className="font-mono font-bold text-blue-700">
                  JSS-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </span>
              </p>
              <p className="text-gray-600 text-sm mt-2">
                You will receive a confirmation email within 24 hours.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Student Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <User className="text-blue-600" size={28} />
                  <h2 className="text-2xl font-bold text-gray-800">Student Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-xl border-2 ${
                        errors.firstName ? 'border-red-300' : 'border-blue-100'
                      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-xl border-2 ${
                        errors.lastName ? 'border-red-300' : 'border-blue-100'
                      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Date of Birth *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`w-full p-3 pl-10 rounded-xl border-2 ${
                          errors.dateOfBirth ? 'border-red-300' : 'border-blue-100'
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                      />
                    </div>
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-xl border-2 ${
                        errors.gender ? 'border-red-300' : 'border-blue-100'
                      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Nationality
                    </label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      placeholder="Enter nationality"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact & Guardian Details */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <Phone className="text-blue-600" size={28} />
                  <h2 className="text-2xl font-bold text-gray-800">Contact & Guardian Details</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-3 pl-10 rounded-xl border-2 ${
                          errors.email ? 'border-red-300' : 'border-blue-100'
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                        placeholder="student@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full p-3 pl-10 rounded-xl border-2 ${
                          errors.phone ? 'border-red-300' : 'border-blue-100'
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                        placeholder="+251 9XX XXX XXX"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Residential Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full p-3 pl-10 rounded-xl border-2 ${
                          errors.address ? 'border-red-300' : 'border-blue-100'
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                        placeholder="Enter complete address"
                      />
                    </div>
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Parent/Guardian Name *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        className={`w-full p-3 pl-10 rounded-xl border-2 ${
                          errors.parentName ? 'border-red-300' : 'border-blue-100'
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                        placeholder="Enter guardian's name"
                      />
                    </div>
                    {errors.parentName && (
                      <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Guardian's Phone
                    </label>
                    <input
                      type="tel"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      placeholder="Guardian's contact number"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Academic Preferences */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="text-blue-600" size={28} />
                  <h2 className="text-2xl font-bold text-gray-800">Academic Preferences</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Previous School
                    </label>
                    <input
                      type="text"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      placeholder="Name of previous school"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Previous Class
                    </label>
                    <input
                      type="text"
                      name="previousClass"
                      value={formData.previousClass}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      placeholder="e.g., Grade 10"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Admission Class *
                    </label>
                    <select
                      name="admissionClass"
                      value={formData.admissionClass}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-xl border-2 ${
                        errors.admissionClass ? 'border-red-300' : 'border-blue-100'
                      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                    >
                      <option value="">Select Class</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                    </select>
                    {errors.admissionClass && (
                      <p className="text-red-500 text-sm mt-1">{errors.admissionClass}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Preferred Stream *
                    </label>
                    <select
                      name="preferredStream"
                      value={formData.preferredStream}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-xl border-2 ${
                        errors.preferredStream ? 'border-red-300' : 'border-blue-100'
                      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                    >
                      <option value="">Select Stream</option>
                      {academicStreams.map(stream => (
                        <option key={stream} value={stream}>{stream}</option>
                      ))}
                    </select>
                    {errors.preferredStream && (
                      <p className="text-red-500 text-sm mt-1">{errors.preferredStream}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Preferred Subjects * (Select at least 3)
                    </label>
                    {errors.subjects && (
                      <p className="text-red-500 text-sm mb-2">{errors.subjects}</p>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {subjectOptions.map(subject => (
                        <label key={subject} className="flex items-center p-3 border-2 border-blue-100 rounded-xl hover:bg-blue-50 cursor-pointer transition">
                          <input
                            type="checkbox"
                            name="subjects"
                            value={subject}
                            checked={formData.subjects.includes(subject)}
                            onChange={handleInputChange}
                            className="mr-2 h-5 w-5 text-blue-600 rounded"
                          />
                          <span className="text-gray-700">{subject}</span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-gray-500">
                      Selected: {formData.subjects.length} subjects
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Medical & Emergency Info */}
            {currentStep === 4 && (
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="text-blue-600" size={28} />
                  <h2 className="text-2xl font-bold text-gray-800">Medical & Emergency Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergencyName"
                      value={formData.emergencyName}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      placeholder="Emergency contact person"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Emergency Phone
                    </label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      placeholder="Emergency contact number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Blood Group
                    </label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Known Allergies
                    </label>
                    <input
                      type="text"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      placeholder="e.g., Peanuts, Penicillin"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Medical Conditions (if any)
                    </label>
                    <textarea
                      name="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      placeholder="Any medical conditions we should be aware of"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="flex items-start p-4 border-2 border-blue-100 rounded-xl hover:bg-blue-50 cursor-pointer transition">
                      <input
                        type="checkbox"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={handleInputChange}
                        className="mr-3 mt-1 h-5 w-5 text-blue-600 rounded"
                      />
                      <div>
                        <span className="font-medium text-gray-700">
                          I hereby declare that all information provided is true and correct to the best of my knowledge. *
                        </span>
                        {errors.agreement && (
                          <p className="text-red-500 text-sm mt-1">{errors.agreement}</p>
                        )}
                        <p className="text-gray-500 text-sm mt-2">
                          I understand that any false information may lead to cancellation of admission. I agree to abide by the rules and regulations of Jarso Senior Secondary School.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition"
                  >
                    ← Previous
                  </button>
                )}
              </div>
              
              <div className="flex gap-4">
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:opacity-90 transition"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-medium hover:opacity-90 transition flex items-center gap-2"
                  >
                    <Award size={20} />
                    Submit Registration
                  </button>
                )}
              </div>
            </div>

            {/* Form Summary */}
            {currentStep === 4 && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-600" />
                  Registration Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Student</div>
                    <div className="font-semibold">{formData.firstName} {formData.lastName}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Admission Class</div>
                    <div className="font-semibold">{formData.admissionClass || 'Not selected'}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Stream</div>
                    <div className="font-semibold">{formData.preferredStream || 'Not selected'}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Subjects</div>
                    <div className="font-semibold">{formData.subjects.length} selected</div>
                  </div>
                </div>
              </div>
            )}
          </form>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600">
            <div>
              <p className="font-medium">Jarso Senior Secondary School</p>
              <p className="text-sm">P.O. Box 1234, Jarso City • 📞 +251 11 234 5678</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm">© 2024 Jarso S.S.S. All rights reserved.</p>
              <p className="text-sm">Admissions Office Hours: Mon-Fri 8:00 AM - 4:00 PM</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}