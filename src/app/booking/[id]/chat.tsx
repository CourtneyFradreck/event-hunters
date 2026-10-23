import { useState, useRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

import { EHColors } from '@/constants/colors';

// Mock messages
const INITIAL_MESSAGES = [
  { id: '1', text: 'Hi! I saw your request for the 14th of Dec. Yes, we can do 220 guests. Do you need plates and cutlery included?', sender: 'caterer', time: '10:42 AM' },
  { id: '2', text: 'That would be great. How much extra is it for the equipment?', sender: 'me', time: '10:45 AM' },
  { id: '3', text: 'I can add it for $1.50 per head. I will send a quote over now so you can review.', sender: 'caterer', time: '10:50 AM' },
];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    setMessages([...messages, {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'me',
      time: 'Just now'
    }]);
    setInputText('');
    
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.root, { paddingBottom: insets.bottom }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color={EHColors.ink} />
          </Pressable>
          <Text style={styles.headerTitle}>Chat</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesList} 
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((m) => {
          const isMe = m.sender === 'me';
          return (
            <View key={m.id} style={[styles.messageBubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
              <Text style={[styles.messageText, isMe ? styles.messageTextMe : styles.messageTextThem]}>
                {m.text}
              </Text>
              <Text style={[styles.messageTime, isMe ? styles.messageTimeMe : styles.messageTimeThem]}>
                {m.time}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Tap to send a reply..."
          placeholderTextColor={EHColors.inkPlaceholder}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <Pressable 
          style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]} 
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Feather name="arrow-up" size={20} color={EHColors.white} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: EHColors.pageBg },
  headerContainer: {
    backgroundColor: EHColors.white,
    borderBottomWidth: 1, borderBottomColor: EHColors.navyBorderLight,
    paddingBottom: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8 },
      android: { elevation: 4 }
    }),
    zIndex: 10,
  },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: EHColors.pageBg, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: EHColors.ink },
  
  
  
  messagesList: { flex: 1 },
  messagesContent: { padding: 18, gap: 16, paddingBottom: 32 },
  messageBubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 16,
  },
  bubbleThem: {
    backgroundColor: EHColors.white,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
  },
  bubbleMe: {
    backgroundColor: EHColors.navy,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  messageText: { fontSize: 15, lineHeight: 22 },
  messageTextThem: { color: EHColors.ink },
  messageTextMe: { color: EHColors.white },
  messageTime: { fontSize: 11, marginTop: 4, alignSelf: 'flex-end' },
  messageTimeThem: { color: EHColors.inkLabel },
  messageTimeMe: { color: 'rgba(255,255,255,0.7)' },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: EHColors.white,
    borderTopWidth: 1, borderTopColor: EHColors.navyBorderLight,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: EHColors.pageBg,
    borderWidth: 1, borderColor: EHColors.navyBorderLight,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12, paddingBottom: 12,
    fontSize: 15, color: EHColors.ink,
    minHeight: 44, maxHeight: 120,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: EHColors.copper,
    alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.5 },
});
