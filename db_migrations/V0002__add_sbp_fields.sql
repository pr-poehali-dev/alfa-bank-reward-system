ALTER TABLE t_p42469412_alfa_bank_reward_sys.withdrawal_requests 
ADD COLUMN IF NOT EXISTS phone_number VARCHAR(20);

ALTER TABLE t_p42469412_alfa_bank_reward_sys.withdrawal_requests 
ADD COLUMN IF NOT EXISTS bank_name VARCHAR(100);