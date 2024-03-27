'use client'

import React, { FocusEvent, KeyboardEvent, useEffect, useState } from 'react';

import { FiEdit } from 'react-icons/fi';
import { Input } from "@/components/ui/input";

const EditName = () => {
    const [name, setName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
  
    useEffect(() => {
        const savedName = localStorage.getItem('userName');
        if (savedName) {
            setName(savedName);
        } else {
          setIsEditing(true);
      }
    }, []);

    useEffect(() => {
      if (name) { // Only update localStorage if name is not empty
        localStorage.setItem('userName', name);
      }
    }, [name]);
  
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const toggleEdit = () => {
      setIsEditing(true);
  };
  
  const handleEditComplete = (event: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    // First, check if the event is a keyboard event and the key is Enter
    if (event.type === 'keydown' && (event as React.KeyboardEvent<HTMLInputElement>).key === "Enter") {
      if (name.trim()) {
        setIsEditing(false);
        event.preventDefault(); // This prevents form submission or any default action
      }
    } else if (event.type === 'blur') { // Then, handle the blur event
      if (name.trim()) {
        setIsEditing(false);
      }
    }
  };
 
  
  return (
    <div className="flex items-center space-x-2">
    {isEditing ? (
      <Input
        type="text"
        value={name}
        onChange={handleNameChange}
          onBlur={handleEditComplete}
          onKeyDown={handleEditComplete}
        autoFocus
        className="w-2/5 text-2xl"
      />
    ) : (
      <>
        <div className="text-2xl text-bold">{name || 'Add a name'}</div>
        <button onClick={toggleEdit} className="text-lg">
          <FiEdit />
        </button>
      </>
    )}
  </div>
  )
}

export default EditName;