import * as yup from 'yup';

const validationSchema = yup.object().shape({
  concept: yup
    .string()
    .min(5, 'Muy corto!')
    .max(20, 'Muy largo!')
    .required('Requerido!'),
  dateFrom: yup.date().required('Requerido!'),
  dateTo: yup.date().required('Requerido!'),
  info: yup.object().shape({
    name: yup
      .string()
      .min(3, 'Tu nombre es muy corto')
      .max(20, 'Tu nombre es demasiado largo')
      .required('Requerido!'),
    position: yup.string().min(5, 'Muy corta!').required('Requerida!'),
    department: yup.string().min(3, 'Muy corto!').required('Requerido!'),
    supervisor: yup.string().min(5, 'Muy corto').required('Requerido!'),
    table: yup.array().of(
      yup.object({
        date: yup.date().required('Requerido!'),
        bankAccount: yup
          .string()
          .min(5, 'No es una cuenta bancaria valida')
          .max(18, 'Número de cuenta muy largo')
          .matches(/^[\d|-]*$/, 'No es una cuenta bancaria válida')
          .required('Requerido!'),
        description: yup
          .string()
          .min(5, 'Descripción muy corta')
          .required('Requerido!'),
        total: yup
          .number()
          .min(0.01, 'No puede estar vacio')
          .required('Requerido!'),
      })
    ),
  }),
  approvedBy: yup.string().min(3, 'Muy corto!').required('Requerido!'),
});

export default validationSchema;
