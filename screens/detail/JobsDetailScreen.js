import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import DetailHeader from '../../components/DetailHeader';
import DetailActionBar from '../../components/DetailActionBar';
import SellerCard from '../../components/SellerCard';

const JobsDetailScreen = ({ route, navigation }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Mock data - in real app this would come from route.params
  const jobData = {
    id: '1',
    title: 'Senior React Native Developer',
    salary: 'Rs 150,000 - 200,000',
    location: 'Karachi, Pakistan',
    postedDate: '2 days ago',
    jobType: 'Full-time',
    experience: '3-5 years',
    company: 'TechCorp Solutions',
    description: 'We are looking for an experienced React Native developer to join our dynamic team. You will be responsible for developing and maintaining mobile applications for iOS and Android platforms.',
    images: ['💼', '💼', '💼', '💼'],
    company: {
      name: 'TechCorp Solutions',
      rating: 4.5,
      totalJobs: 15,
      memberSince: '2018',
      verified: true,
      industry: 'Technology',
      size: '50-100 employees',
    },
    requirements: {
      'Experience': '3-5 years',
      'Education': 'BS Computer Science',
      'Skills': 'React Native, JavaScript, TypeScript',
      'Location': 'Karachi, Pakistan',
      'Job Type': 'Full-time',
      'Remote': 'Hybrid',
      'Visa Sponsorship': 'No',
    },
    responsibilities: [
      'Develop and maintain React Native applications',
      'Collaborate with cross-functional teams',
      'Write clean, maintainable code',
      'Participate in code reviews',
      'Debug and fix issues',
      'Optimize app performance',
      'Stay updated with latest technologies',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Annual bonuses',
      'Professional development',
      'Flexible working hours',
      'Remote work options',
      'Team building activities',
    ],
    skills: [
      'React Native',
      'JavaScript/TypeScript',
      'Redux/Context API',
      'Git',
      'REST APIs',
      'Mobile UI/UX',
      'Performance optimization',
    ]
  };

  const handleCall = () => {
    Alert.alert('Call Company', 'Calling TechCorp Solutions...');
  };

  const handleChat = () => {
    Alert.alert('Start Chat', 'Opening chat with HR...');
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    Alert.alert('Favorite', isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Sharing this job posting...');
  };

  const handleApply = () => {
    Alert.alert('Apply', 'Applying for this position...');
  };

  const handleViewCompany = () => {
    Alert.alert('Company Profile', 'Viewing company profile...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <DetailHeader
          navigation={navigation}
          onShare={handleShare}
          onFavorite={handleFavorite}
          isFavorite={isFavorite}
          title={jobData.title}
          showTitle={true}
        />

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <View style={styles.mainImage}>
            <Text style={styles.imagePlaceholder}>{jobData.images[0]}</Text>
          </View>
        </View>

        {/* Salary and Title Section */}
        <View style={styles.salarySection}>
          <Text style={styles.salary}>{jobData.salary}</Text>
          <Text style={styles.title}>{jobData.title}</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.location}>{jobData.location}</Text>
            <Text style={styles.postedDate}> • {jobData.postedDate}</Text>
          </View>
        </View>

        {/* Job Type Badge */}
        <View style={styles.jobTypeContainer}>
          <View style={styles.jobTypeBadge}>
            <Text style={styles.jobTypeText}>{jobData.jobType}</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{jobData.experience}</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{jobData.company.industry}</Text>
            <Text style={styles.statLabel}>Industry</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{jobData.company.size}</Text>
            <Text style={styles.statLabel}>Company Size</Text>
          </View>
        </View>

        {/* Job Requirements */}
        <View style={styles.requirementsSection}>
          <Text style={styles.sectionTitle}>Job Requirements</Text>
          <View style={styles.requirementsGrid}>
            {Object.entries(jobData.requirements).map(([key, value]) => (
              <View key={key} style={styles.requirementItem}>
                <Text style={styles.requirementLabel}>{key}</Text>
                <Text style={styles.requirementValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Responsibilities */}
        <View style={styles.responsibilitiesSection}>
          <Text style={styles.sectionTitle}>Key Responsibilities</Text>
          <View style={styles.responsibilitiesList}>
            {jobData.responsibilities.map((responsibility, index) => (
              <View key={index} style={styles.responsibilityItem}>
                <Text style={styles.responsibilityIcon}>•</Text>
                <Text style={styles.responsibilityText}>{responsibility}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Benefits & Perks</Text>
          <View style={styles.benefitsList}>
            {jobData.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>🎁</Text>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Required Skills */}
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Required Skills</Text>
          <View style={styles.skillsList}>
            {jobData.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.description}>{jobData.description}</Text>
        </View>

        {/* Company Information */}
        <View style={styles.companySection}>
          <Text style={styles.sectionTitle}>Company Information</Text>
          <SellerCard
            seller={jobData.company}
            onViewProfile={handleViewCompany}
            sellerType="Company"
          />
        </View>

        {/* Similar Jobs */}
        <View style={styles.similarSection}>
          <Text style={styles.sectionTitle}>Similar Jobs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} style={styles.similarItem}>
                <View style={styles.similarImage}>
                  <Text style={styles.similarEmoji}>💼</Text>
                </View>
                <Text style={styles.similarTitle}>Frontend Developer</Text>
                <Text style={styles.similarSalary}>Rs 120,000</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Action Buttons */}
      <DetailActionBar
        onFavorite={handleFavorite}
        onChat={handleChat}
        onCall={handleCall}
        isFavorite={isFavorite}
        chatText="💬 Message"
        callText="📞 Call"
        showVisitButton={true}
        onVisit={handleApply}
        visitText="📝 Apply"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    backgroundColor: '#f8f9fa',
  },
  mainImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    fontSize: 60,
  },
  salarySection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  salary: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  postedDate: {
    fontSize: 14,
    color: '#999',
  },
  jobTypeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  jobTypeBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  jobTypeText: {
    color: '#2ecc71',
    fontSize: 12,
    fontWeight: '600',
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  requirementsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  requirementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  requirementItem: {
    width: '45%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
  },
  requirementLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  requirementValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  responsibilitiesSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  responsibilitiesList: {
    gap: 10,
  },
  responsibilityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  responsibilityIcon: {
    fontSize: 16,
    color: '#2ecc71',
    marginRight: 10,
    marginTop: 2,
  },
  responsibilityText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },
  benefitsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  benefitsList: {
    gap: 10,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  benefitText: {
    fontSize: 14,
    color: '#333',
  },
  skillsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skillText: {
    color: '#2ecc71',
    fontSize: 12,
    fontWeight: '600',
  },
  descriptionSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  companySection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  similarSection: {
    padding: 20,
  },
  similarItem: {
    width: 120,
    marginRight: 15,
  },
  similarImage: {
    width: 120,
    height: 80,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  similarEmoji: {
    fontSize: 30,
  },
  similarTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  similarSalary: {
    fontSize: 12,
    color: '#2ecc71',
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
});

export default JobsDetailScreen; 