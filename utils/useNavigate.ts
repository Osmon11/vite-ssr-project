export const useNavigate = () => ({
  navigate: (path: string) =>
    (window.location.href = path),
});
