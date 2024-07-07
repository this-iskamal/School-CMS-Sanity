import { defineField, defineType } from 'sanity';

export const contactUsType = defineType({
  name: 'contactUs',
  title: 'Contact Us Information',
  type: 'document',
  fields: [
    defineField({
      name: 'telephone',
      title: 'Telephone',
      type: 'string',
      validation: Rule => Rule.required().error('Telephone number is required.')
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email().error('Valid email is required.')
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: Rule => Rule.required().error('Location  is required.')
    })
  ],

  preview: {
    select: {
      title: 'telephone',
      subtitle: 'email'
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: `Contact: ${title}`,
        subtitle: `Email: ${subtitle}`
      };
    },
  },
});
