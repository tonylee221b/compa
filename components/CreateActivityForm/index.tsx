import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Datepicker,
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import { getAllCities } from '../../backend/city-service';
import dayjs from 'dayjs';
import { PlacesAutocomplete } from '../PlacesAutocomplete';
import { CitySelect } from '../CitySelect';
import { useAuthUserContext } from '../../context/AuthUserContext';
import { createActivity } from '../../backend';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface CreateActivityFormProps
  extends NativeStackScreenProps<any, any> {}

const formValues = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title is too long' }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(1000, { message: 'Description is too long' }),
  placeId: z.string().optional(),
  limit: z
    .string()
    .transform((value) => +value)
    .refine((val) => !isNaN(val), { message: 'Only accept number' })
    .refine((val) => val >= 1, { message: 'Limit must be greater than 1' }),
  userId: z.string().min(1, { message: 'User ID is required' }),
  startDate: z.string().min(1, { message: 'Start Date is required' }),
  city: z.string().min(1, { message: 'City is required' }),
});

type FormValues = z.infer<typeof formValues>;

export const CreateActivityForm = (props: CreateActivityFormProps) => {
  const { authUser } = useAuthUserContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(formValues),
    defaultValues: {
      city: '',
      description: '',
      placeId: '',
      limit: 0,
      startDate: '',
      title: '',
      userId: '',
    },
  });
  const { errors } = form.formState;

  useEffect(() => {
    form.setValue('userId', authUser?.id ?? '');
  }, [authUser]);

  const onSubmitPress = form.handleSubmit(async (data) => {
    try {
      await createActivity(data);
      props.navigation.navigate('MyActivities');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  });

  return (
    <Layout style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <Text category="h3">Create activity</Text>
          <Layout style={styles.formGroup}>
            <PlacesAutocomplete
              label="Location"
              controller={{
                control: form.control,
                name: 'placeId',
              }}
            />
            <Text status="danger" appearance="hint">
              {errors.placeId?.message}
            </Text>
          </Layout>
          <Layout style={styles.formGroup}>
            <Controller
              control={form.control}
              name="title"
              render={({ field: { onChange, ...field } }) => (
                <Input {...field} onChangeText={onChange} label="Title" />
              )}
            />
            <Text status="danger" appearance="hint">
              {errors.title?.message}
            </Text>
          </Layout>
          <Layout style={styles.formGroup}>
            <Controller
              control={form.control}
              name="description"
              render={({ field: { onChange, ...field } }) => (
                <Input
                  onChangeText={onChange}
                  {...field}
                  label="Description"
                  multiline
                  textStyle={{ minHeight: 64 }}
                />
              )}
            />
            <Text status="danger" appearance="hint">
              {errors.description?.message}
            </Text>
          </Layout>
          <Layout style={styles.formGroup}>
            <CitySelect controller={{ control: form.control, name: 'city' }} />
            <Text status="danger" appearance="hint">
              {errors.city?.message}
            </Text>
          </Layout>
          <Layout style={styles.formGroup}>
            <Controller
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <Datepicker
                  onBlur={field.onBlur}
                  date={
                    field.value.length > 0 ? new Date(field.value) : new Date()
                  }
                  onSelect={(date) => field.onChange(date.toISOString())}
                  label="Start date"
                  filter={(date) => dayjs(date).isAfter(dayjs())}
                />
              )}
            />
            <Text status="danger" appearance="hint">
              {errors.startDate?.message}
            </Text>
          </Layout>
          <Layout style={styles.formGroup}>
            <Controller
              control={form.control}
              name="limit"
              render={({ field: { value, onChange, ...field } }) => (
                <Input
                  onChangeText={onChange}
                  value={value.toString()}
                  {...field}
                  label="Participant's limit"
                />
              )}
            />
            <Text status="danger" appearance="hint">
              {errors.limit?.message}
            </Text>
          </Layout>
          <Layout style={styles.formGroup}>
            <Button
              status="basic"
              onPress={() => props.navigation.navigate('MyActivities')}
            >
              Cancel
            </Button>
            <Button style={{ marginTop: 8 }} onPress={onSubmitPress}>
              Create
            </Button>
          </Layout>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  formGroup: {
    marginTop: 16,
  },
  container: {
    flex: 1,
    padding: 32,
  },
});
