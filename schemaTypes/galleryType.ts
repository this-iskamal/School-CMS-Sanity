// Import necessary functions from Sanity
import { defineField, defineType } from 'sanity';

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    // Gallery Title
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      validation: Rule => Rule.required().min(5).error('Title is required and should be at least 5 characters long.')
    }),

    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          
        }
      ],
      options: {
        layout: 'grid',
      },
      validation: Rule => Rule.required().min(1).error('At least one image must be added.')
    }),
  ],

  preview: {
    select: {
      title: 'title'
    
    },
    prepare(selection) {
      const { title} = selection;
      return {
        title
      
      };
    },
  },
});
