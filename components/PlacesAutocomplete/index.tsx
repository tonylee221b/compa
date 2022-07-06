import React from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from '@ui-kitten/components';
import { Prediction, searchLocation } from '../../backend/location-service';
import { useController, UseControllerProps } from 'react-hook-form';

const searchLocationDebounce = AwesomeDebouncePromise(searchLocation, 400);

export interface PlacesAutocompleteProps<T> {
  controller: Pick<UseControllerProps<T>, 'control' | 'name'>;
  label: string;
}

export function PlacesAutocomplete<T>(props: PlacesAutocompleteProps<T>) {
  const [query, setQuery] = React.useState<string>('');
  const [data, setData] = React.useState<Prediction[]>([]);
  const { field } = useController(props.controller);

  const updateData = () => {
    searchLocationDebounce(query).then(setData);
  };

  React.useEffect(updateData, [query]);

  const onSelect = (index: number) => {
    setQuery(data[index].description);
    field.onChange(data[index].place_id);
  };

  const onChangeText = (nextQuery: string) => {
    setQuery(nextQuery);
  };

  const renderOption = (item: Prediction) => (
    <AutocompleteItem key={item.place_id} title={item.description} />
  );

  return (
    <Autocomplete
      placeholder="Search for a location"
      value={query}
      onChangeText={onChangeText}
      onSelect={onSelect}
      label={props.label}
    >
      {data.map(renderOption)}
    </Autocomplete>
  );
}
