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
          <Text style={styles.title}>Watch to Learn</Text>
          <Text style={styles.subtitle}>Your learning journey and progress</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HorizontalVideoList category="Grammar" description="brief description..." />
          <HorizontalVideoList category="Vocabulary" description="brief description..." />
          <HorizontalVideoList category="Reading" description="brief description..." />
          <HorizontalVideoList category="Writing" description="brief description..." />
          <HorizontalVideoList category="Speaking" description="brief description..." />
          <HorizontalVideoList category="Listening" description="brief description..." />
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
    fontSize: 20,
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