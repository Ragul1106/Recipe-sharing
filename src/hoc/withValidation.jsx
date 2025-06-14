
export default function withValidation(Component) {
  return function Validated(props) {
    const isValid = (form) => {
      return Object.values(form).every((field) => field.trim());
    };
    return <Component {...props} isValid={isValid} />;
  };
}
