import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import Container from '../components/Container';
import { useSettings } from '../SettingsProvider';

export default function FaqScreen() {
    const [activeIndex, setActiveIndex] = useState(null);
    const { getColor, translate } = useSettings();
    const faqItems = translate('faqItems');
    const items = Array.isArray(faqItems) ? faqItems : [];

    const styles = {
        screen: {
            paddingBottom: 0
        },
        content: {
            paddingBottom: 26
        },
        title: {
            fontFamily: 'KGRedHands',
            fontSize: 28,
            color: getColor('secondary'),
            marginTop: 26,
            marginBottom: 26
        },
        accordion: {
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 8,
            marginBottom: 10,
            overflow: 'hidden'
        },
        accordionOpen: {
            borderColor: getColor('secondary')
        },
        header: {
            minHeight: 56,
            paddingHorizontal: 16,
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12
        },
        question: {
            flex: 1,
            fontFamily: 'KGRedHands',
            fontSize: 15,
            lineHeight: 21,
            color: getColor('secondary')
        },
        answerBox: {
            paddingHorizontal: 16,
            paddingBottom: 15
        },
        answer: {
            fontSize: 14,
            lineHeight: 21,
            color: getColor('text'),
            marginTop: 8
        }
    };

    return (
        <Container additionalStyle={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>{translate('faqTitle')}</Text>
                {items.map((item, index) => {
                    const isOpen = activeIndex === index;

                    return (
                        <View
                            key={item.question}
                            style={[styles.accordion, isOpen && styles.accordionOpen]}
                        >
                            <TouchableOpacity
                                accessibilityRole='button'
                                accessibilityState={{ expanded: isOpen }}
                                activeOpacity={0.8}
                                onPress={() => setActiveIndex((currentIndex) => (
                                    currentIndex === index ? null : index
                                ))}
                                style={styles.header}
                            >
                                <Text style={styles.question}>{item.question}</Text>
                                <FontAwesome6
                                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                                    size={15}
                                    color={isOpen ? getColor('secondary') : getColor('muted')}
                                />
                            </TouchableOpacity>
                            {isOpen && (
                                <View style={styles.answerBox}>
                                    {item.answer.map((paragraph) => (
                                        <Text key={paragraph} style={styles.answer}>
                                            {paragraph}
                                        </Text>
                                    ))}
                                </View>
                            )}
                        </View>
                    )
                })}
            </ScrollView>
        </Container>
    )
}
