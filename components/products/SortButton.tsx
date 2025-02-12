import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SortButtonProps {
  title: string;
  value: string;
  currentSort: string;
  currentOrder: 'asc' | 'desc';
  onSort: (newValue: string) => void;
}

export const SortButton: React.FC<SortButtonProps> = ({
  title,
  value,
  currentSort,
  currentOrder,
  onSort,
}) => {
  const isActive = currentSort === value;

  return (
    <TouchableOpacity
      onPress={() => onSort(value)}
      style={{
        backgroundColor: isActive
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'white', marginRight: 4 }}>{title}</Text>
        {isActive && (
          <MaterialIcons
            name={currentOrder === 'asc' ? 'arrow-upward' : 'arrow-downward'}
            size={16}
            color="white"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};