// The POI page, viewing POI info, comments, and ratings
import React, { useState, useRef } from 'react';
import { ThemeProvider, createTheme, Button, Text, Icon, ListItem } from '@rneui/themed';
import { View, ScrollView, Keyboard, Alert, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import { DB_URL } from '@env';
import { CustomTextInput } from '../components/signup-login-inputs';

export default PoiPage = ({ navigation, route }) => {
	// Passed in POI and user
	const { POI, user } = route.params;

	//useStates
	const [comments, setComments] = useState(POI.posts);
	const [ratings, setRatings] = useState(POI.ratings);

	const [newComment, setNewComment] = useState('');
	const [isSaving, setIsSaving] = useState(false);

	// References for our inputs
	let commentInput = useRef(null);

	const handleComment = () => {
		if (newComment == '') {
			commentInput.current?.shake();
		} else {
			setIsSaving(true);

			let commentData = { comment: newComment, author: user, poi: POI, name: user.display };
			axios
				.post(`${DB_URL}/post`, commentData)
				.then(function (response) {
					console.log(response);
					console.log(response.data.data);
					setNewComment('');
					setComments([...comments, commentData]);
					//clearStates();
				})
				.finally(() => {
					setIsSaving(false);
				})
				.catch(function (error) {
					console.warn(error);
				});
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<SafeAreaProvider style={{ flex: 1, backgroundColor: '#17001F' }}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={100}
					style={{ flex: 1 }}
				>
					<ScrollView>
						<View style={{ width: '100%', height: '100%', backgroundColor: '#17001F' }}>
							<Button
								title='Back'
								type='outline'
								raised
								titleStyle={{ fontSize: 15 }}
								containerStyle={{ marginTop: '5%', marginLeft: '5%', marginRight: '75%' }}
								onPress={() => navigation.goBack()}
							/>
							<Text h1>{POI?.title ?? 'Title'}</Text>
							<Text h3>{POI?.description ?? 'Description'}</Text>
							{comments?.map((comment, index) => (
								<ListItem
									bottomDivider={true}
									key={index}
								>
									<ListItem.Content>
										<ListItem.Title>{comment.authorId}</ListItem.Title>
										<ListItem.Subtitle>{comment.comment}</ListItem.Subtitle>
									</ListItem.Content>
								</ListItem>
							))}

							<CustomTextInput
								ref={(input) => (commentInput = input)}
								disabled={isSaving}
								value={newComment}
								onChangeText={(text) => setNewComment(text)}
								iconName='comment-outline'
								iconType='material-community'
								placeholder='Enter comment...'
							/>
							<Button
								disabled={isSaving}
								loading={isSaving}
								loadingProps={{ color: '#FFFFFF', size: 31.5 }}
								title='Comment'
								type='outline'
								raised
								containerStyle={{ marginHorizontal: 100, marginTop: 20 }}
								onPress={() => handleComment()}
								icon={
									<Icon
										name='comment-plus-outline'
										type='material-community'
										style={{ marginLeft: 10 }}
										color='#FFFFFF'
										size={25}
									/>
								}
								iconRight={true}
							/>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaProvider>
		</ThemeProvider>
	);
};

// Ok still want to create seperate files for theme / styles
const theme = createTheme({
	lightColors: {
		primary: '#3d5afe',
	},
	darkColors: {
		primary: '#3d5afe',
	},
	mode: 'dark',
	backgroundColor: '#17001F',
	components: {
		Text: {
			h1Style: {
				fontSize: 50,
				textAlign: 'center',
				color: '#FFFFFF',
			},
			h2Style: {
				fontSize: 25,
				textAlign: 'center',
				color: '#86939E',
				paddingTop: '5%',
				paddingBottom: '1%',
			},
			h3Style: {
				fontSize: 25,
				textAlign: 'center',
				color: '#86939E',
				paddingTop: '5%',
				paddingBottom: '5%',
			},
			h4Style: {
				fontSize: 20,
				textAlign: 'center',
				paddingTop: 5,
				color: '#FF0000',
			},
		},
		Button: {
			buttonStyle: {
				backgroundColor: '#8F00FF',
				borderColor: '#D49DFF',
				borderWidth: 1.5,
			},
			titleStyle: {
				color: '#FFFFFF',
				fontSize: 25,
				fontWeight: 'bold',
			},
		},
		ButtonGroup: {
			containerStyle: {
				height: 50,
				borderWidth: 1,
			},
			buttonStyle: {
				backgroundColor: '#D49DFF',
				borderTopWidth: 0,
				borderLeftWidth: 0,
				borderBottomWidth: 3,
				borderRightWidth: 3,
				borderColor: '#363636',
			},
			disabledStyle: {
				backgroundColor: '#9D62CC',
			},
			disabledSelectedStyle: {
				backgroundColor: '#440079',
			},
			selectedButtonStyle: {
				backgroundColor: '#8F00FF',
				borderTopWidth: 3,
				borderLeftWidth: 3,
				borderBottomWidth: 0,
				borderRightWidth: 0,
				borderColor: '#363636',
			},
			textStyle: {
				color: '#000000',
				fontSize: 25,
				fontWeight: 'bold',
			},
			selectedTextStyle: {
				color: '#FFFFFF',
			},
		},
	},
});
