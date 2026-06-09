import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts (optional but recommended)
Font.register({
    family: 'Inter',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2', fontWeight: 'normal' },
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5nw.woff2', fontWeight: 'bold' },
    ],
});

const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#ffffff',
        fontFamily: 'Inter',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#1e293b',
    },
    subtitle: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        paddingBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 12,
        color: '#0f172a',
    },
    paragraph: {
        fontSize: 12,
        lineHeight: 1.5,
        marginBottom: 12,
        color: '#334155',
    },
    hook: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#4A8B7D',
        fontStyle: 'italic',
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 6,
        fontSize: 11,
    },
    bulletIcon: {
        width: 12,
        marginRight: 8,
        color: '#4A8B7D',
    },
    bulletText: {
        flex: 1,
        color: '#475569',
    },
    practicalInfo: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        fontSize: 11,
        color: '#475569',
        lineHeight: 1.4,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        fontSize: 9,
        color: '#94a3b8',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 16,
    },
});

const PDFDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Title */}
            {data.title && (
                <Text style={styles.title}>{data.title}</Text>
            )}

            {/* Hook */}
            {data.hook && (
                <Text style={styles.hook}>"{data.hook}"</Text>
            )}

            {/* Description */}
            {data.description && (
                <>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.paragraph}>{data.description}</Text>
                </>
            )}

            {/* Highlights */}
            {data.highlights && data.highlights.length > 0 && (
                <>
                    <Text style={styles.sectionTitle}>Points forts</Text>
                    <View>
                        {data.highlights.map((highlight, index) => (
                            <View key={index} style={styles.bulletPoint}>
                                <Text style={styles.bulletIcon}>•</Text>
                                <Text style={styles.bulletText}>{highlight}</Text>
                            </View>
                        ))}
                    </View>
                </>
            )}

            {/* Practical Info */}
            {data.practicalInfo && (
                <>
                    <Text style={styles.sectionTitle}>Informations pratiques</Text>
                    <View style={styles.practicalInfo}>
                        <Text>{data.practicalInfo}</Text>
                    </View>
                </>
            )}

            {/* Full text if needed */}
            {data.generatedText && !data.title && !data.description && (
                <Text style={styles.paragraph}>{data.generatedText}</Text>
            )}

            {/* Footer */}
            <Text style={styles.footer} fixed>
                Document généré par AI Real Estate Assistant • {new Date().toLocaleDateString('fr-CH')}
            </Text>
        </Page>
    </Document>
);

export default PDFDocument;