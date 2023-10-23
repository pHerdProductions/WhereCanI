import React from 'react';
import { Icon, Input } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import { View, StyleSheet } from 'react-native';

// ____________ TEXT INPUTS ____________

// Default custom text input
const CustomTextInput = React.forwardRef((props, ref) => {
	return (
		<Input
			ref={ref}
			leftIcon={
				<Icon
					name={props.iconName}
					type={props.iconType}
					style={{ marginLeft: 10, marginRight: 20 }}
					color={props.iconColor || '#FFFFFF'}
					size={props.size || 25}
				/>
			}
			placeholder={props.placeholder}
			keyboardType={props.keyboardType}
			onSubmitEditing={props.onSubmitEditing}
			value={props.value}
			onChange={props.onChange}
			onChangeText={props.onChangeText}
			secureTextEntry={props.secureTextEntry}
			autoCapitalize={props.autoCapitalize || 'none'}
			autoCorrect={false}
			style={{ borderWidth: 0, color: '#FFFFFF' }}
			returnKeyType='next'
			maxLength={props.maxLength || 100}
		/>
	);
});

const CityInput = React.forwardRef((props, ref) => {
	return (
		<CustomTextInput
			ref={ref}
			onSubmitEditing={props.onSubmitEditing}
			value={props.value}
			onChange={props.onChange}
			onChangeText={props.onChangeText}
			iconName='city-variant-outline'
			iconType='material-community'
			placeholder='City'
			autoCapitalize='words'
			maxLength={30}
		/>
	);
});

const ZipInput = React.forwardRef((props, ref) => {
	return (
		<CustomTextInput
			ref={ref}
			onSubmitEditing={props.onSubmitEditing}
			value={props.value}
			onChange={props.onChange}
			onChangeText={props.onChangeText}
			iconName='map-marker-radius-outline'
			iconType='material-community'
			placeholder='ZipCode'
			keyboardType='number-pad'
			maxLength={5}
		/>
	);
});

const HashtagsInput = React.forwardRef((props, ref) => {
	return (
		<Input
			ref={ref}
			onSubmitEditing={props.onSubmitEditing}
			value={props.value}
			onChange={props.onChange}
			onChangeText={props.onChangeText}
			multiline={true}
			textAlignVertical='top'
			size={100}
			placeholder='#enter #hash #tags #like #this'
			maxLength={128}
			style={{ paddingTop: 25 }}
		/>
	);
});

// ____________ DROPDOWN MENU ____________

const StateDropDown = React.forwardRef((props, ref) => {
	return (
		<View style={[dropStyle.container]}>
			<Dropdown
				ref={ref}
				style={[dropStyle.dropdown, props.style]}
				placeholderStyle={dropStyle.placeholderStyle}
				selectedTextStyle={dropStyle.selectedTextStyle}
				inputSearchStyle={dropStyle.inputSearchStyle}
				data={props.data}
				search
				maxHeight={280}
				labelField='label'
				valueField='value'
				placeholder={props.placeholder}
				searchPlaceholder='Search...'
				value={props.value}
				onFocus={props.onFocus}
				onBlur={props.onBlur}
				onChange={props.onChange}
				renderLeftIcon={() => (
					<Icon
						name='map'
						type='simple-line-icon'
						style={{ marginLeft: 2, marginRight: 22 }}
						color='#FFFFFF'
						size={25}
					/>
				)}
			/>
		</View>
	);
});

// Styling for drop down menu
const dropStyle = StyleSheet.create({
	container: {
		marginHorizontal: 10,
		marginVertical: 20,
	},
	dropdown: {
		height: 50,
		borderWidth: 1.5,
		borderRadius: 5,
		paddingHorizontal: 8,
		borderColor: '#86939e',
	},
	icon: {
		marginRight: 20,
	},
	label: {
		position: 'absolute',
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
		color: '#FFFFFF',
	},
	placeholderStyle: {
		fontSize: 18,
		color: '#86939e',
	},
	selectedTextStyle: {
		fontSize: 18,
		color: '#FFFFFF',
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 18,
	},
});

export { CityInput, ZipInput, HashtagsInput, StateDropDown };
