import { useState } from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import Container from '../components/Container';
import { useSettings } from '../SettingsProvider';

export default function FaqScreen() {
    const [activeIndex, setActiveIndex] = useState(null);
    const { getColor, settings, translate, updateSettings } = useSettings();
    const faqItems = translate('faqItems');
    const items = Array.isArray(faqItems) ? faqItems : [];
    const readItemIds = settings.faqReadItemIds || [];

    const markItemAsRead = (index) => {
        const itemId = `faq-${index}`;
        if (readItemIds.includes(itemId)) return;

        updateSettings({
            faqReadItemIds: [...readItemIds, itemId]
        });
    };

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
            borderRadius: 14,
            backgroundColor: getColor('surface'),
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
        },
        table: {
            borderColor: getColor('border'),
            borderWidth: 1,
            borderRadius: 14,
            overflow: 'hidden',
            marginTop: 14
        },
        tableRow: {
            flexDirection: 'row',
            borderBottomColor: getColor('border'),
            borderBottomWidth: 1
        },
        tableRowLast: {
            borderBottomWidth: 0
        },
        tableHeaderCell: {
            flex: 1,
            backgroundColor: getColor('primary'),
            padding: 10
        },
        tableCell: {
            flex: 1,
            padding: 10
        },
        tableText: {
            fontSize: 12,
            lineHeight: 17,
            color: getColor('text')
        },
        tableHeaderText: {
            fontFamily: 'KGRedHands',
            fontSize: 12,
            lineHeight: 17,
            color: getColor('secondary')
        },
        sourceBox: {
            padding: 14,
            marginTop: 22
        },
        sourceText: {
            fontSize: 13,
            lineHeight: 20,
            color: getColor('muted')
        },
        sourceLink: {
            fontFamily: 'KGRedHands',
            color: getColor('secondary')
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
                                onPress={() => setActiveIndex((currentIndex) => {
                                    const nextIndex = currentIndex === index ? null : index;
                                    if (nextIndex !== null) markItemAsRead(index);

                                    return nextIndex;
                                })}
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
                                    {Array.isArray(item.compatibilityTable) && (
                                        <View style={styles.table}>
                                            <View style={styles.tableRow}>
                                                <View style={styles.tableHeaderCell}>
                                                    <Text style={styles.tableHeaderText}>
                                                        {translate('faqCompatibilityDonor')}
                                                    </Text>
                                                </View>
                                                <View style={styles.tableHeaderCell}>
                                                    <Text style={styles.tableHeaderText}>
                                                        {translate('faqCompatibilityRecipients')}
                                                    </Text>
                                                </View>
                                            </View>
                                            {item.compatibilityTable.map((row, rowIndex) => (
                                                <View
                                                    key={row.donor}
                                                    style={[
                                                        styles.tableRow,
                                                        rowIndex === item.compatibilityTable.length - 1 && styles.tableRowLast
                                                    ]}
                                                >
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.tableText}>{row.donor}</Text>
                                                    </View>
                                                    <View style={styles.tableCell}>
                                                        <Text style={styles.tableText}>{row.recipients}</Text>
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    )
                })}
                <View style={styles.sourceBox}>
                    <Text style={styles.sourceText}>
                        {translate('faqSourceInfo')}{' '}
                        <Text
                            onPress={() => Linking.openURL(translate('faqSourceUrl'))}
                            style={styles.sourceLink}
                        >
                            {translate('faqSourceUrl')}
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </Container>
    )
}
