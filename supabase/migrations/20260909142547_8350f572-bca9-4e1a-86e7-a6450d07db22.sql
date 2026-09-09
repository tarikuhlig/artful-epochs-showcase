REVOKE ALL ON FUNCTION public.award_study_card_for_user(uuid, date) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.complete_daily_lesson_for_user(uuid, date, text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.award_study_card_for_user(uuid, date) TO service_role;
GRANT EXECUTE ON FUNCTION public.complete_daily_lesson_for_user(uuid, date, text, integer) TO service_role;