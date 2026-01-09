import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    ScrollView,
} from 'react-native'
import React, { useMemo, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6'
import LinearGradient from 'react-native-linear-gradient'
import tw from 'twrnc'
import COLORS from '../../constants/color'
import { Fonts } from '../../constants/font'
import { FieldErrors } from '../../types/validator'
import useGlobalStore from '../../stores/globalStore'
import { RootStackParamList } from '../../types/route'
import { useAlertStore } from '../../stores/alertStore'
import { useDimensionInsets } from '../../utils/dimension'
import { CustomButton, CustomTextInput } from '../../components'
import { EmailIcon, PersonIcon, SlingBagIcon } from '../../../assets/icons'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'EditUser'>;
}

const EditUserScreen = (props: Props) => {
    const { translate, showLoading, hideLoading } = useGlobalStore();
    const { showAlert } = useAlertStore();
    const { insets } = useDimensionInsets();

    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<FieldErrors>({});

    const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

    const validate = () => {
        const nextErrors: FieldErrors = {};

        if (!name.trim()) nextErrors.name = translate('requiredField');
        if (!username.trim()) nextErrors.username = translate('requiredField');

        const emailValue = email.trim();
        if (!emailValue) {
            nextErrors.email = translate('requiredField');
        } else if (!emailRegex.test(emailValue)) {
            nextErrors.email = translate('invalidEmail');
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    const handleSave = async () => {
        if (!validate()) return;

        try {
            showLoading();
            showAlert(translate('profileUpdated'));
            props.navigation.goBack();
        } catch {
            showAlert(translate('somethingWentWrong'));
        } finally {
            hideLoading();
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={tw`flex-1`}>
                <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={tw`h-25`}
                />
                <View
                    pointerEvents="none"
                    style={[
                        tw`w-full h-full absolute mt-17 top-0 left-0 right-0 rounded-t-3xl opacity-30`,
                        { backgroundColor: COLORS.white },
                    ]}
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={[tw`flex-1 rounded-t-3xl -mt-6 overflow-hidden px-4 pt-4`, { backgroundColor: COLORS.background }]}
                >
                    <View style={tw`flex-row items-center justify-between rounded-t-3xl`}>
                        <TouchableOpacity
                            onPress={() => props.navigation.goBack()}
                            style={tw`w-8 h-8 rounded-full bg-white items-center justify-center shadow-md`}
                        >
                            <FontAwesome6
                                size={20}
                                iconStyle='solid'
                                color={COLORS.black}
                                name="angle-left"
                            />
                        </TouchableOpacity>
                        <Text style={[tw`flex-1 text-center text-[19px]`, { fontFamily: Fonts.medium, color: COLORS.text }]}>
                            {translate('profile')}
                        </Text>
                        <View style={tw`w-8 h-8`} />
                    </View>

                    <ScrollView
                        bounces={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={[tw`pt-6`, { paddingBottom: Math.max(insets.bottom, 16) }]}
                    >
                        <CustomTextInput
                            value={name}
                            label={translate('name')}
                            preffix={<PersonIcon />}
                            placeholder="Muhammad Arif Ilham"
                            onChangeText={text => {
                                setName(text)
                                if (errors.name) setErrors(prev => ({ ...prev, name: undefined }))
                            }}
                            errorMessage={errors.name}
                        />
                        <View style={tw`h-6`} />
                        <CustomTextInput
                            value={job}
                            label={translate('job')}
                            preffix={<SlingBagIcon width={17} height={17} />}
                            placeholder={translate('jobPlaceholder')}
                            onChangeText={text => {
                                setJob(text)
                                if (errors.job) setErrors(prev => ({ ...prev, job: undefined }))
                            }}
                            errorMessage={errors.job}
                        />
                        <View style={tw`h-6`} />
                        <CustomTextInput
                            value={username}
                            autoCapitalize="none"
                            label="Username"
                            preffix={<PersonIcon />}
                            placeholder="CharlesDhiya"
                            onChangeText={text => {
                                setUsername(text)
                                if (errors.username) setErrors(prev => ({ ...prev, username: undefined }))
                            }}
                            errorMessage={errors.username}
                        />
                        <View style={tw`h-6`} />
                        <CustomTextInput
                            value={email}
                            label="Email"
                            autoCapitalize='none'
                            preffix={<EmailIcon />}
                            keyboardType='email-address'
                            placeholder="example@gmail.com"
                            onChangeText={text => {
                                setEmail(text)
                                if (errors.email) setErrors(prev => ({ ...prev, email: undefined }))
                            }}
                            errorMessage={errors.email}
                        />

                        <View style={tw`h-10`} />
                        <CustomButton
                            title={translate('save')}
                            onPress={handleSave}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default EditUserScreen