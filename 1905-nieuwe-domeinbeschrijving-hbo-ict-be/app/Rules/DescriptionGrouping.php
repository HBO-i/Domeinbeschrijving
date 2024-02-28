<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class DescriptionGrouping implements ValidationRule
{
    private static array $options = ['levels', 'activities', 'architecture_layers'];
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $grouping = explode(',', $value);

        if (count($grouping) !== 3){
            $fail('Required amount of grouping options is 3, ' . count($grouping) . ' provided.');
            return;
        }

        if (count(array_unique($grouping)) !== 3){
            $fail('Grouping contained duplicate values');
            return;
        }

        for ($i = 0; $i < 3; $i++){
            if (!in_array($grouping[$i], self::$options)){
                $fail('Invalid grouping provided, valid values are: ' . implode(', ', self::$options));
                return;
            }
        }
    }
}
