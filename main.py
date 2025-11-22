
from dataclasses import dataclass


@dataclass
class Output:
    cum_guaranteed_income: float
    negative_income_tax: float
    eitc: float
    basic_income_tax: float
    net: float

# Constants
AGE_ADULT = 19
AGE_OLDER_ADULT = 65
PCGNI = 5 * 10_000_000  # Per Capita Gross National Income
MEAN_INCOME = 0.6 * PCGNI
EXPECTED_CWD_RETURN_RATE = 0.03  # CWD: Common Wealth Dividend


def is_adult(age: int) -> bool:
    return AGE_ADULT <= age < AGE_OLDER_ADULT


def compute_negative_income_tax(income: float, age: int) -> float:
    breakeven_income = MEAN_INCOME
    
    if is_adult(age):
        clawback_rate = 0.1
    else:
        clawback_rate = 0.2

    return (income - breakeven_income) * clawback_rate


def compute_basic_income_tax(income: float) -> float:
    breakeven_income = MEAN_INCOME
    if income > breakeven_income:
        basic_income_tax = 0.1 * (income - breakeven_income)
    else:
        basic_income_tax = 0
    return basic_income_tax


def compute_eitc(earned_income: float) -> float:
    if earned_income > 0.5 * PCGNI:
        eitc = 0.12 * 0.5 * PCGNI + 0.06 * PCGNI
    else:
        eitc = 0.12 * earned_income
    return eitc


def compute(age: int, income: float, earned_income: float) -> float:
    # 1. Common wealth divident basic income
    cwd_basic_income = EXPECTED_CWD_RETURN_RATE * PCGNI  # taxable
    
    # 2. Guaranteed basic income
    if is_adult(age):
        guaranteed_basic_income = 0.06 * PCGNI
    else:
        guaranteed_basic_income = 0.12 * PCGNI
    
    # 3. NIT
    negative_income_tax = compute_negative_income_tax(income, age)
    
    # 4. Basic income tax
    basic_income_tax = compute_basic_income_tax(income)
    
    # 5. EITC
    eitc = compute_eitc(earned_income)
    
    cum_guaranteed_income = cwd_basic_income + guaranteed_basic_income
    
    return Output(
        cum_guaranteed_income=cum_guaranteed_income,
        negative_income_tax=negative_income_tax,
        eitc=eitc,
        basic_income_tax=basic_income_tax,
        net=cum_guaranteed_income + eitc - basic_income_tax - negative_income_tax
    )
    

if __name__ == "__main__":
    print(compute(30, 40000000, 20000000, True))
