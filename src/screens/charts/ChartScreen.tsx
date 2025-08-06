import { StyleSheet, View } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import { useApi } from '../../hooks/useApi';

export default function ChartScreen() {

    const { data, error, isLoading } = useApi<any>({
        endpoint: '/video',
        queryOptions: {
            enabled: true,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchInterval: 5000,
        },
    });

    console.log("=======chart screen===============")
    console.log(data);
    console.log("==================================")

    // const videoUrl = data?.data?.url || '';

    const videoUrl = "https://metatrader.gianthunterai.com/api/video#:~:text=https%3A//metatrader.gianthunterai.com/storage/videos/01JWF8629TFH21VMDVCTDKZ5RJ.MOV";

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                html, body {
                    margin: 0;
                    padding: 0;
                    background-color: black;
                    overflow: hidden;
                    width: 100%;
                    height: 100%;
                }
                .video-bg {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    pointer-events: none;
                }
            </style>
        </head>
        <body>
            <div class="video-bg">
                <video autoplay loop muted playsinline>
                    <source src="${videoUrl}" type="video/mp4" />
                </video>
            </div>
        </body>
        </html>
    `;

    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                style={styles.webview}
                javaScriptEnabled
                domStorageEnabled
                allowsInlineMediaPlayback
                mediaPlaybackRequiresUserAction={false}
                scrollEnabled={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    webview: {
        flex: 1,
    },
});
