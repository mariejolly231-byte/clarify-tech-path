ALTER TABLE public.workshop_responses
  ADD CONSTRAINT repetitive_task_length CHECK (repetitive_task IS NULL OR char_length(repetitive_task) <= 500),
  ADD CONSTRAINT ai_usage_size CHECK (array_length(ai_usage, 1) IS NULL OR array_length(ai_usage, 1) <= 20),
  ADD CONSTRAINT tools_tested_size CHECK (array_length(tools_tested, 1) IS NULL OR array_length(tools_tested, 1) <= 20),
  ADD CONSTRAINT goals_size CHECK (array_length(goals, 1) IS NULL OR array_length(goals, 1) <= 20),
  ADD CONSTRAINT tools_automation_length CHECK (tools_automation IS NULL OR char_length(tools_automation) <= 100);