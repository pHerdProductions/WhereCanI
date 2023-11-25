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
					size={25}
				/>
			}
			disabled={props.disabled}
			placeholder={props.placeholder}
			keyboardType={props.keyboardType}
			onSubmitEditing={props.onSubmitEditing}
			value={props.value}
			onChange={props.onChange}
			onChangeText={props.onChangeText}
			secureTextEntry={props.secureTextEntry}
			autoCapitalize='none'
			autoCorrect={false}
			style={{ borderWidth: 0, color: '#FFFFFF' }}
			returnKeyType='next'
		/>
	);
});

const EmailInput = React.forwardRef((props, ref) => {
	return (
		<CustomTextInput
			ref={ref}
			disabled={props.disabled}
			onSubmitEditing={props.onSubmitEditing}
			value={props.value}
			onChange={props.onChange}
			onChangeText={props.onChangeText}
			iconName='email-outline'
			iconType='material-community'
			placeholder='Email'
			keyboardType='email-address'
		/>
	);
});

const UsernameInput = React.forwardRef((props, ref) => {
	return (
		<CustomTextInput
			ref={ref}
			disabled={props.disabled}
			onSubmitEditing={props.onSubmitEditing}
			value={props.value}
			onChange={props.onChange}
			onChangeText={props.onChangeText}
			iconName='user'
			iconType='simple-line-icon'
			placeholder='Username'
		/>
	);
});

const PasswordInput = React.forwardRef((props, ref) => {
	return (
		<CustomTextInput
			ref={ref}
			disabled={props.disabled}
			onSubmitEditing={props.onSubmitEditing}
			value={props.value}
			onChange={props.onChange}
			onChangeText={props.onChangeText}
			iconName='lock'
			iconType='simple-line-icon'
			placeholder='Password'
			secureTextEntry={true}
		/>
	);
});

const ConfirmPasswordInput = React.forwardRef((props, ref) => {
	return (
		<CustomTextInput
			ref={ref}
			disabled={props.disabled}
			onSubmitEditing={props.onSubmitEditing}
			value={props.value}
			onChange={props.onChange}
			onChangeText={props.onChangeText}
			iconColor={props.iconColor}
			iconName='lock'
			iconType='simple-line-icon'
			placeholder='Confirm Password'
			secureTextEntry={true}
		/>
	);
});

const DisplayInput = React.forwardRef((props, ref) => {
	return (
		<CustomTextInput
			ref={ref}
			disabled={props.disabled}
			value={props.value}
			onChange={props.onChange}
			onChangeText={props.onChangeText}
			iconName='eyeglass'
			iconType='simple-line-icon'
			placeholder='Display Name'
		/>
	);
});

// ____________ DROPDOWN MENU ____________

const StateDropDown = React.forwardRef((props, ref) => {
	return (
		<View style={[dropStyle.container]}>
			<Dropdown
				ref={ref}
				disable={props.disable}
				style={[dropStyle.dropdown, props.style]}
				placeholderStyle={[dropStyle.placeholderStyle, props.placeholderStyle]}
				selectedTextStyle={[dropStyle.selectedTextStyle, props.selectedTextStyle]}
				inputSearchStyle={[dropStyle.inputSearchStyle, props.inputSearchStyle]}
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
		marginBottom: 20,
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

export { EmailInput, UsernameInput, PasswordInput, ConfirmPasswordInput, DisplayInput, StateDropDown };
