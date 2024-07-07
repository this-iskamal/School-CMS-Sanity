import {defineField, defineType} from 'sanity'

export const teacherType = defineType({
  name: 'teacher',
  title: 'Teachers',
  type: 'document',
  fields: [

    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required().min(3).error('Full name is required and should be at least 3 characters.')
    }),
   
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: Rule => Rule.required().error('Address is required.')
    }),
  
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'email',
          validation: Rule => Rule.error('Please enter a valid email address.'),
          description: 'Email address (optional)'
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          
          
          validation: Rule => Rule.required().error('Phone number is required.')
        })
      ]
    }),
 
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
        accept:"image/*",
      },
      validation: Rule => Rule.required().error('Profile image is required.')
    }),
   
    defineField({
      name: 'subjects',
      title: 'Subjects Taught',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'subject',
              title: 'Subject',
              type: 'string',
              validation: Rule => Rule.required().error('Subject is required.')
            }),
            defineField({
              name: 'class',
              title: 'Class',
              type: 'string',
              validation: Rule => Rule.required().error('Class is required.')
            })
          ]
        }
      ],
      validation: Rule => Rule.min(1).error('At least one subject must be added.')
    })
  ],

  preview: {
    select: {
      title: 'fullName',
      subtitle: 'contact.phone',
      media: 'profileImage'
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title,
        subtitle: subtitle ? `Phone: ${subtitle}` : 'No phone number provided',
        media 
      }
    }
  }
})
