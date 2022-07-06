import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { getAllCities } from '../../backend/city-service';

export interface CitySelectProps<T> {
  controller: Pick<UseControllerProps<T>, 'control' | 'name'>;
}

export function CitySelect<T>(props: CitySelectProps<T>) {
  const { field } = useController(props.controller);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCityIndex, setSelectedCityIndex] = React.useState(
    new IndexPath(0)
  );

  useEffect(function fetchCities() {
    getAllCities('canada', 'ontario').then((cities) => {
      setCities(cities);
    });
  }, []);

  useEffect(
    function syncCityIndex() {
      field.onChange(cities[selectedCityIndex.row]);
    },
    [selectedCityIndex, cities]
  );

  return (
    <Select
      label="City"
      value={field.value as string}
      onBlur={field.onBlur}
      selectedIndex={selectedCityIndex}
      onSelect={(index) => {
        setSelectedCityIndex(index as IndexPath);
      }}
    >
      {cities.map((city) => (
        <SelectItem key={city} title={city} />
      ))}
    </Select>
  );
}
