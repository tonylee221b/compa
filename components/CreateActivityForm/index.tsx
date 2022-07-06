import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Datepicker,
  IndexPath,
  Input,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import { getAllCities } from '../../backend/city-service';
import dayjs from 'dayjs';
import { PlacesAutocomplete } from '../PlacesAutocomplete';
import { CitySelect } from '../CitySelect';

export interface CreateActivityFormProps {}

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
    .min(1, { message: 'Limit is required' })
    .refine((val) => !isNaN(+val), { message: 'Only accept number' })
    .refine((val) => +val >= 1, { message: 'Limit must be greater than 1' }),
  userId: z.string().min(1, { message: 'User ID is required' }),
  startDate: z.string().min(1, { message: 'Start Date is required' }),
  city: z.string().min(1, { message: 'City is required' }),
});

type FormValues = z.infer<typeof formValues>;

export const CreateActivityForm = (props: CreateActivityFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formValues),
    defaultValues: {
      city: '',
      description: '',
      placeId: '',
      limit: '',
      startDate: '',
      title: '',
      userId: '',
    },
  });
  const { errors } = form.formState;

  const onSubmitPress = form.handleSubmit((data) => console.log(data));

  return (
    <View>
      <Text category="h3">Create activity</Text>

      <View style={styles.formGroup}>
        <Controller
          control={form.control}
          name="title"
          render={({ field }) => <Input {...field} label="Title" />}
        />
        <Text status="danger" appearance="hint">
          {errors.title?.message}
        </Text>
      </View>

      <View style={styles.formGroup}>
        <Controller
          control={form.control}
          name="description"
          render={({ field }) => (
            <Input
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
      </View>

      <View style={styles.formGroup}>
        <CitySelect controller={{ control: form.control, name: 'city' }} />

        <Text status="danger" appearance="hint">
          {errors.city?.message}
        </Text>
      </View>

      <View style={styles.formGroup}>
        <Controller
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <Datepicker
              onBlur={field.onBlur}
              date={field.value.length > 0 ? new Date(field.value) : new Date()}
              onSelect={(date) => field.onChange(date.toISOString())}
              label="Start date"
              filter={(date) => dayjs(date).isAfter(dayjs())}
            />
          )}
        />
        <Text status="danger" appearance="hint">
          {errors.startDate?.message}
        </Text>
      </View>

      <View style={styles.formGroup}>
        <Controller
          control={form.control}
          name="limit"
          render={({ field }) => (
            <Input {...field} label="Participant's limit" />
          )}
        />
        <Text status="danger" appearance="hint">
          {errors.limit?.message}
        </Text>
      </View>

      <View style={styles.formGroup}>
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
      </View>

      <View style={styles.formGroup}>
        <Button onPress={onSubmitPress}>Create</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formGroup: {
    marginTop: 16,
  },
});
