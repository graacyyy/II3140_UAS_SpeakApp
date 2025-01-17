import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Linking } from 'react-native';
import Header from '@/components/header';
import videoData from '@/components/videoData';

type VideoListItem = {
  category: string;
  description: string;
};

const HorizontalVideoList = ({ category, description }: VideoListItem) => {
  const filteredVideos = videoData.filter((video) => video.category === category);

  return (
    <View style={styles.categorySection}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <Text style={styles.categoryDescription}>{description}</Text>
      <FlatList
        horizontal
        data={filteredVideos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.videoCard} onPress={() => Linking.openURL(item.link)}>
            <Image source={{ uri: item.image }} style={styles.videoImage} />
            <Text style={styles.videoTitle}>{item.title}</Text>
            <Text style={styles.videoCreator}>{item.creator}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const LearnPage = () => {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Learn Through Videos</Text>
          <Text style={styles.subtitle}>Discover curated videos to enhance your English skills.</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HorizontalVideoList category="Grammar" description="Strengthen your understanding of grammar rules" />
          <HorizontalVideoList category="Vocabulary" description="Boost your word power and their practical usage" />
          <HorizontalVideoList category="Reading" description="Enhance your skills in understanding and analyzing texts" />
          <HorizontalVideoList category="Writing" description="Learn to write effectively focusing on structure, tone, and clarity" />
          <HorizontalVideoList category="Speaking" description="Practice clear and natural conversations" />
          <HorizontalVideoList category="Listening" description="Train your ears to understand different accents, tones, and contexts in English" />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
  },
  titleSection: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'column'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#4B5563',
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  videoCard: {
    width:180,
    marginRight: 16,
  },
  videoImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  videoCreator: {
    fontSize: 14,
    color: '#555',
  },
});

export default LearnPage;