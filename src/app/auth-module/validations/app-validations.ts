import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function matchValidator(
  controlNameA: string,
  controlNameB: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const controlOne = formGroup.get(controlNameA)?.value;
    const controlTwo = formGroup.get(controlNameB)?.value;
    if (controlOne === controlTwo) {
      return null;
    }

    return { passwordsDoNotMatch: true };
  };
}
