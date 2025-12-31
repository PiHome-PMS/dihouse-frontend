/**
 * Permission data matching exactly with BDC demo site
 * Structure: Section → Category → Group → Permission → Actions
 */

export interface PermissionItem {
  id: string;
  name: string;
  actions: string[];
}

export interface PermissionGroup {
  id: string;
  title: string;
  permissions: PermissionItem[];
}

export interface PermissionCategory {
  id: string;
  title: string;
  groups: PermissionGroup[];
}

export interface PermissionSection {
  id: string;
  title: string;
  permissions?: PermissionItem[]; // For flat sections (notification)
  groups?: PermissionGroup[]; // For app section (2-level)
  categories?: PermissionCategory[]; // For web section (3-level)
}

// =====================================================
// QUYỀN TRÊN APP
// =====================================================
export const appPermissions: PermissionSection = {
  id: 'app',
  title: 'Quyền trên app',
  groups: [
    {
      id: 'app_van_hanh_cty',
      title: 'Vận hành công ty',
      permissions: [
        { id: 'app_nhan_vien', name: 'Nhân viên', actions: ['view'] },
        { id: 'app_phong_ban', name: 'Phòng ban', actions: ['view'] },
        { id: 'app_don_tu', name: 'Đơn từ', actions: ['view'] },
        { id: 'app_cham_cong', name: 'Chấm công', actions: ['view'] },
        { id: 'app_lich_bieu', name: 'Lịch biểu', actions: ['view'] },
        { id: 'app_ca_kip', name: 'Ca kíp', actions: ['view'] },
        { id: 'app_thong_bao_noi_bo', name: 'Thông báo nội bộ công ty', actions: ['view'] },
        { id: 'app_tai_san', name: 'Tài sản', actions: ['view'] },
        { id: 'app_tai_lieu', name: 'Tài liệu', actions: ['view'] },
        { id: 'app_ho_so', name: 'Hồ sơ', actions: ['view'] },
        { id: 'app_duyet_don', name: 'Duyệt Đơn', actions: ['view'] },
      ],
    },
    {
      id: 'app_van_hanh_toa_nha',
      title: 'Vận hành tòa nhà',
      permissions: [
        { id: 'app_kien_nghi', name: 'Kiến nghị', actions: ['view'] },
        { id: 'app_yeu_cau', name: 'Yêu cầu', actions: ['view'] },
        { id: 'app_bao_cao', name: 'Báo cáo', actions: ['view'] },
        { id: 'app_thong_bao', name: 'Thông báo', actions: ['view'] },
        { id: 'app_dien_nuoc', name: 'Điện nước', actions: ['view', 'update', 'insert'] },
        { id: 'app_lich_bao_tri', name: 'Lịch bảo trì', actions: ['view'] },
        { id: 'app_the_cu_dan', name: 'Thẻ cư dân', actions: ['view'] },
        { id: 'app_thay_dong_ho', name: 'Thay đồng hồ', actions: ['view'] },
        { id: 'app_toa_nha', name: 'Tòa nhà', actions: ['view'] },
        { id: 'app_tien_ich', name: 'Tiện ích', actions: ['view', 'update', 'insert'] },
        { id: 'app_quan_ly_kho', name: 'Quản lý kho', actions: ['view', 'update', 'insert'] },
        { id: 'app_khach_ngoai', name: 'Quản lý khách ngoài', actions: ['view_image'] },
        { id: 'app_cong_viec', name: 'Công việc', actions: ['view', 'update', 'insert'] },
      ],
    },
  ],
};

// =====================================================
// QUYỀN TRÊN WEB
// =====================================================
export const webPermissions: PermissionSection = {
  id: 'web',
  title: 'Quyền trên web',
  categories: [
    // ---- CÔNG TY ----
    {
      id: 'web_cong_ty',
      title: 'Công ty',
      groups: [
        {
          id: 'web_ql_quyen',
          title: 'Quản Lý Quyền',
          permissions: [
            {
              id: 'web_nhom_quyen',
              name: 'Nhóm quyền',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_quyen_su_dung',
              name: 'Quyền sử dụng',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_quyen_anh_huong',
              name: 'Quyền ảnh hưởng',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
          ],
        },
        {
          id: 'web_ql_cong_ty',
          title: 'Quản Lý Công Ty',
          permissions: [
            {
              id: 'web_ds_cong_ty',
              name: 'Danh sách công ty',
              actions: ['view', 'detail', 'insert', 'update'],
            },
            {
              id: 'web_phong_ban',
              name: 'Danh sách phòng ban',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_bo_phan',
              name: 'Danh sách bộ phận',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_nguoi_dung',
              name: 'Danh sách người dùng',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            { id: 'web_du_lieu_su_dung', name: 'Dữ liệu sử dụng', actions: ['view'] },
          ],
        },
        {
          id: 'web_ql_du_an',
          title: 'Quản lý dự án',
          permissions: [
            {
              id: 'web_ds_du_an',
              name: 'Danh sách dự án',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_ds_phan_khu',
              name: 'Danh sách phân khu',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_ds_toa_nha',
              name: 'Danh sách tòa nhà',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
          ],
        },
        {
          id: 'web_thiet_lap',
          title: 'Thiết lập',
          permissions: [
            {
              id: 'web_menu_app',
              name: 'Menu app cư dân',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
          ],
        },
        {
          id: 'web_ql_nhan_su',
          title: 'Quản lý nhân sự',
          permissions: [
            {
              id: 'web_cau_hinh_cham_cong',
              name: 'Cấu hình chấm công',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_thiet_bi_cham_cong',
              name: 'Quản lý thiết bị chấm công',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_chuc_vu',
              name: 'Quản lý chức vụ',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_ca_lam_viec',
              name: 'Quản lý ca làm việc',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_ds_nhan_su',
              name: 'Danh sách nhân sự',
              actions: ['view', 'detail', 'insert', 'update', 'delete', 'export', 'import'],
            },
            {
              id: 'web_lich_su_cham_cong',
              name: 'Lịch sử chấm công',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_ql_cham_cong',
              name: 'Quản lý chấm công',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_danh_gia_nhan_su',
              name: 'Đánh giá nhân sự tháng',
              actions: ['view', 'detail', 'delete', 'export', 'import'],
            },
          ],
        },
        {
          id: 'web_ql_phe_duyet',
          title: 'Quản lý phê duyệt',
          permissions: [
            {
              id: 'web_loai_don',
              name: 'Danh sách loại đơn',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_quyen_phe_duyet',
              name: 'Danh sách quyền phê duyệt',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
          ],
        },
        {
          id: 'web_quang_cao',
          title: 'Quảng cáo',
          permissions: [
            {
              id: 'web_vi_tri_quang_cao',
              name: 'Vị trí quảng cáo',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_ds_quang_cao',
              name: 'Danh sách quảng cáo',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
          ],
        },
        {
          id: 'web_bao_cao',
          title: 'Báo cáo',
          permissions: [
            { id: 'web_bc_can_ho', name: 'Báo cáo căn hộ sử dụng', actions: ['view', 'export'] },
            { id: 'web_thong_ke', name: 'Thống kê dữ liệu', actions: ['view', 'export'] },
          ],
        },
        {
          id: 'web_cai_dat',
          title: 'Cài đặt',
          permissions: [
            {
              id: 'web_tool_admin',
              name: 'Tool cho ADMIN',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            { id: 'web_lich_su_thao_tac', name: 'Lịch sử thao tác', actions: ['view'] },
          ],
        },
        {
          id: 'web_doanh_thu_chi_phi',
          title: 'Doanh thu - chi phí',
          permissions: [
            {
              id: 'web_nha_cung_cap',
              name: 'Nhà cung cấp/khách hàng',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_hop_dong_ncc',
              name: 'Hợp đồng nhà cung cấp',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_danh_muc_tk',
              name: 'Danh mục tài khoản kế toán',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_ma_ngan_sach',
              name: 'Quản lý mã ngân sách',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_khoan_muc',
              name: 'Quản lý khoản mục',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_cau_hinh_duyet_chi',
              name: 'Cấu hình duyệt chi',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_cong_no_phat_sinh',
              name: 'Công nợ phát sinh',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_phieu_de_nghi_chi',
              name: 'Quản lý phiếu đề nghị chi',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_phieu_thu_chi',
              name: 'Quản lý phiếu thu/chi',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_so_quy',
              name: 'Sổ quỹ',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_tong_hop_cong_no',
              name: 'Tổng hợp công nợ',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_tong_hop_dt_cp',
              name: 'Tổng hợp doanh thu - chi phí',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_bang_can_doi',
              name: 'Bảng cân đối tài khoản',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
          ],
        },
      ],
    },
    // ---- DỰ ÁN ----
    {
      id: 'web_du_an',
      title: 'Dự án',
      groups: [
        {
          id: 'web_ql_cong_no',
          title: 'Quản Lý Công Nợ',
          permissions: [
            {
              id: 'web_chi_tiet_bang_ke',
              name: 'Chi tiết bảng kê',
              actions: ['view', 'detail', 'delete', 'export'],
            },
            {
              id: 'web_tong_hop_cong_no_da',
              name: 'Tổng hợp công nợ',
              actions: ['view', 'detail', 'delete', 'export'],
            },
            {
              id: 'web_ql_tien_thua',
              name: 'Quản lý tiền thừa',
              actions: ['view', 'detail', 'delete', 'export', 'import'],
            },
          ],
        },
        {
          id: 'web_can_ho_cu_dan',
          title: 'Căn Hộ Cư Dân',
          permissions: [
            {
              id: 'web_ql_can_ho',
              name: 'Quản lý căn hộ',
              actions: ['view', 'detail', 'insert', 'update', 'delete', 'export', 'import'],
            },
            {
              id: 'web_ql_cu_dan',
              name: 'Quản lý cư dân',
              actions: ['view', 'detail', 'insert', 'update', 'delete', 'export', 'import'],
            },
            {
              id: 'web_hop_dong_can_ho',
              name: 'Hợp đồng căn hộ',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_the_cu_dan',
              name: 'Thẻ cư dân',
              actions: ['view', 'detail', 'insert', 'update', 'delete', 'export'],
            },
          ],
        },
        {
          id: 'web_thong_tin_du_an',
          title: 'Thông tin dự án',
          permissions: [
            {
              id: 'web_tong_quan',
              name: 'Tổng quan dự án',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_cam_nang',
              name: 'Cẩm nang dự án',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_bo_phan_da',
              name: 'Bộ phận dự án',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_tai_lieu_da',
              name: 'Tài liệu dự án',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
          ],
        },
        {
          id: 'web_y_kien_cu_dan',
          title: 'Ý Kiến Cư Dân',
          permissions: [
            {
              id: 'web_y_kien',
              name: 'Ý kiến cư dân',
              actions: ['view', 'detail', 'insert', 'delete', 'comment', 'notification'],
            },
            {
              id: 'web_yeu_cau_dv',
              name: 'Yêu cầu dịch vụ',
              actions: ['view', 'detail', 'insert', 'delete', 'comment', 'notification'],
            },
          ],
        },
        {
          id: 'web_ke_toan_da',
          title: 'Kế Toán',
          permissions: [
            {
              id: 'web_ds_dich_vu',
              name: 'Danh sách dịch vụ',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_bang_gia',
              name: 'Bảng giá',
              actions: ['view', 'detail', 'insert', 'update', 'delete', 'import'],
            },
            {
              id: 'web_phuong_tien',
              name: 'Phương tiện',
              actions: ['view', 'detail', 'insert', 'update', 'delete', 'export', 'import'],
            },
            {
              id: 'web_chi_so_dien_nuoc',
              name: 'Chỉ số điện nước',
              actions: ['view', 'detail', 'insert', 'update', 'delete', 'export', 'import'],
            },
            {
              id: 'web_phieu_thu_chi_da',
              name: 'Phiếu thu/chi',
              actions: ['view', 'detail', 'insert', 'update', 'delete', 'export'],
            },
          ],
        },
        {
          id: 'web_giam_sat_bai_xe',
          title: 'Giám sát bãi xe',
          permissions: [
            { id: 'web_lich_su_ra_vao', name: 'Lịch sử ra vào', actions: ['view', 'export'] },
            {
              id: 'web_doanh_thu_bai_xe',
              name: 'Doanh thu bãi xe',
              actions: ['view', 'export', 'update'],
            },
            { id: 'web_bc_phuong_tien', name: 'Báo cáo phương tiện', actions: ['view', 'export'] },
          ],
        },
        {
          id: 'web_tien_ich_da',
          title: 'Tiện ích',
          permissions: [
            {
              id: 'web_ds_tien_ich',
              name: 'Danh sách tiện ích',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_dat_cho',
              name: 'Đặt chỗ',
              actions: ['view', 'detail', 'insert', 'update', 'delete', 'approve'],
            },
          ],
        },
        {
          id: 'web_tai_san_da',
          title: 'Quản lý tài sản',
          permissions: [
            {
              id: 'web_ql_tai_san',
              name: 'Quản lý tài sản',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_bao_tri',
              name: 'Bảo trì bảo dưỡng',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
            {
              id: 'web_ql_kho',
              name: 'Quản lý kho',
              actions: ['view', 'detail', 'insert', 'update', 'delete'],
            },
          ],
        },
      ],
    },
  ],
};

// =====================================================
// QUYỀN THÔNG BÁO
// =====================================================
export const notificationPermissions: PermissionSection = {
  id: 'notification',
  title: 'Quyền thông báo',
  permissions: [
    { id: 'noti_dat_cho', name: 'Thông báo đặt chỗ', actions: ['thong_bao'] },
    { id: 'noti_y_kien', name: 'Thông báo ý kiến cư dân', actions: ['thong_bao'] },
    { id: 'noti_yeu_cau', name: 'Thông báo yêu cầu cư dân', actions: ['thong_bao'] },
    { id: 'noti_tin_tuc', name: 'Thông báo tin tức', actions: ['thong_bao'] },
  ],
};

// All sections combined
export const defaultPermissionSections: PermissionSection[] = [
  appPermissions,
  webPermissions,
  notificationPermissions,
];
